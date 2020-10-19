import { defineComponent, computed } from 'vue'
import { DISPLAY_MODES, MEDIA_TYPES } from '../../enums'
import mutations from '../../store/mutations'
import currentDisplayMode from '../../store/getters/display-mode/current-display-mode'
import toggleSelectedMediaItem from '../../store/actions/media/toggle-selected-media-item'
import changeLocation from '../../store/actions/location/change-location'
import isSelectedMediaItem from '../../store/getters/media/is-selected-media-item'
import { getFileIcon, isImageType } from '../../utilities'
import { MediaItem } from '../../types'

export default defineComponent({
    name: 'v-media-item',

    props: {
        item: {
            type: Object as () => MediaItem,
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
        function setSelectedItem(item: MediaItem, event): void {
            if (this.selection === 'files' && item.type !== MEDIA_TYPES.FILE)
                return

            if (event.ctrlKey && props.multiple)
                return toggleSelectedMediaItem(item)

            mutations.setSelectedMediaItems([item])
        }

        function openItem(item: MediaItem): void {
            if (item.type === MEDIA_TYPES.DIRECTORY)
                changeLocation(item.path).then()
        }

        const isSelected = computed((): boolean => isSelectedMediaItem(props.item))

        const iconClass = computed((): string => {
            if (props.item.type === MEDIA_TYPES.DIRECTORY)
                return 'fas fa-fw fa-folder'

            return getFileIcon(props.item.mimetype)
        })

        const showThumbnail = computed((): boolean => {
            if (props.item.type === MEDIA_TYPES.FILE)
                return false

            if ( ! isImageType(props.item.mimetype))
                return false

            return currentDisplayMode() === DISPLAY_MODES.THUMBNAILS
        })

        const thumbnailStyles = computed((): string => `background-image: url("${props.item.url}");`)

        return {
            setSelectedItem,
            openItem,
            isSelected,
            showThumbnail,
            thumbnailStyles,
            iconClass,
        }
    },

    template: `
        <div @click="setSelectedItem(item, $event)"
             @dblclick="openItem(item)"
             class="media-item" :class="{'selected': isSelected}">
            <div v-if="showThumbnail" :style="thumbnailStyles" class="media-item-thumbnail"></div>
            <span v-else class="media-item-icon"><i :class="iconClass"></i></span>
            <span :title="item.name" class="media-item-name">{{ item.name }}</span>
        </div>
    `,
})

