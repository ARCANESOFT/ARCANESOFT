import { defineComponent, computed, PropType } from 'vue'
import { MediaItem } from '../../types'
import { DISPLAY_MODES, MEDIA_TYPES } from '../../enums'
import loading from '../../store/modules/loading'
import location from '../../store/modules/location'
import displayMode from '../../store/modules/display-mode'
import mediaItems from '../../store/modules/media-items'
import selectedMediaItems from '../../store/modules/selected-media-items'
import { getFileIcon, isImageType } from '../../utilities'

export default defineComponent({
    name: 'v-media-item',

    props: {
        item: {
            type: Object as PropType<MediaItem>,
            required: true,
        },

        multiple: {
            type: Boolean,
            default: false,
        },

        selection: {
            type: String,
            default: 'any', // 'files', 'any'
        },
    },

    setup(props) {
        const { handleLoading } = loading()
        const { setCurrent: setCurrentLocation } = location()
        const { selected: selectedDisplayMode } = displayMode()
        const { isMediaType, loadItems: loadMediaItems } = mediaItems()
        const {
            setItems: setSelectedMediaItems,
            toggle: toggleSelectedMediaItem,
            isSelected: isSelectedMediaItem
        } = selectedMediaItems()

        const isSelected = isSelectedMediaItem(props.item)
        const iconClass = computed<string>(() => {
            if (props.item.type === MEDIA_TYPES.DIRECTORY)
                return 'fas fa-fw fa-folder'

            return getFileIcon(props.item.mimetype)
        })
        const showThumbnail = computed<boolean>(() => {
            if (props.item.type !== MEDIA_TYPES.FILE)
                return false

            if ( ! isImageType(props.item.mimetype))
                return false

            return selectedDisplayMode.value === DISPLAY_MODES.THUMBNAILS
        })

        const selectItem = (item: MediaItem, event): void => {
            if (props.selection === 'files' && item.type !== MEDIA_TYPES.FILE)
                return

            if (event.ctrlKey && props.multiple)
                return toggleSelectedMediaItem(item)

            setSelectedMediaItems([item])
        }

        const openItem = async (item: MediaItem): Promise<void> => {
            if ( ! isMediaType(item, MEDIA_TYPES.DIRECTORY))
                return

            setCurrentLocation(item.path)

            return handleLoading(async (): Promise<void> => await loadMediaItems(item.path))
        }

        return {
            selectItem,
            openItem,
            isSelected,
            showThumbnail,
            iconClass,
        }
    },

    template: `
        <div @click="selectItem(item, $event)" @dblclick="openItem(item)"
             class="media-item" :class="{'selected': isSelected}">
            <div v-if="showThumbnail" class="media-item-thumbnail">
                <img :src="item.url" :alt="item.name" class="h-100 w-100" style="object-fit: contain">
            </div>
            <div v-else class="media-item-icon d-flex justify-content-center align-items-center px-2">
                <i :class="iconClass"></i>
            </div>
            <div :title="item.name" class="media-item-name d-flex align-items-center">
                <span>{{ item.name }}</span>
            </div>
        </div>
    `,
})

