import { defineComponent, computed, PropType } from 'vue'
import { useActions, useGetters, useHelpers, useMutations } from '../../store'
import { MediaItem } from '../../types'
import { DISPLAY_MODES, MEDIA_TYPES } from '../../enums'
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
        const { changeCurrentLocation } = useActions()
        const { selectedDisplayMode } = useGetters()
        const { isMediaType, isMediaItemSelected } = useHelpers()
        const { setSelectedItems, toggleSelectedItem } = useMutations()

        const isSelected = computed<boolean>(() => isMediaItemSelected(props.item))

        const iconClass = computed<string>(
            () => props.item.type === MEDIA_TYPES.DIRECTORY ? 'fas fa-fw fa-folder' : getFileIcon(props.item.mimetype)
        )
        const showThumbnail = computed<boolean>(() => {
            if (props.item.type !== MEDIA_TYPES.FILE)
                return false

            if ( ! isImageType(props.item.mimetype))
                return false

            return selectedDisplayMode.value === DISPLAY_MODES.THUMBNAILS
        })

        const onClick = (item: MediaItem, event): void => {
            if (props.selection === 'files' && item.type !== MEDIA_TYPES.FILE)
                return

            if (event.ctrlKey && props.multiple)
                return toggleSelectedItem(item)

            setSelectedItems([item])
        }

        const onDoubleClick = async (item: MediaItem): Promise<void> => {
            if ( ! isMediaType(item, MEDIA_TYPES.DIRECTORY))
                return

            return await changeCurrentLocation(item.path)
        }

        return {
            onClick,
            onDoubleClick,
            isSelected,
            showThumbnail,
            iconClass,
        }
    },

    template: `
        <div @click.prevent="onClick(item, $event)"
             @dblclick.prevent="onDoubleClick(item)"
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

