import { defineComponent, onMounted, computed } from 'vue'
import { EVENTS, DISPLAY_MODES } from '../../enums'
import displayMode from '../../store/modules/display-mode'
import loading from '../../store/modules/loading'
import mediaItems from '../../store/modules/media-items'
import previewMode from '../../store/modules/preview-mode'

import MediaItem from './media-item'

export default defineComponent({
    name: 'v-media-items-container',

    components: {
        MediaItem,
    },

    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false
        },
        selection: {
            type: String,
            default: 'any', // 'any' | 'files'
        },
    },

    setup(props) {
        const { isSelected: isSelectedMode } = displayMode()
        const { handleLoading } = loading()
        const { items, loadItems: loadMediaItems } = mediaItems()
        const { shown: isPreviewModeShown } = previewMode()

        // Computed
        // const hasActiveMediaTool = computed((): boolean => getters.getActiveMediaTool() !== null)
        const containerClasses = computed<Object>(() => ({
            'display-mode-grid':       isSelectedMode(DISPLAY_MODES.GRID).value,
            'display-mode-icons':      isSelectedMode(DISPLAY_MODES.ICONS).value,
            'display-mode-list':       isSelectedMode(DISPLAY_MODES.LIST).value,
            'display-mode-thumbnails': isSelectedMode(DISPLAY_MODES.THUMBNAILS).value,
            'with-preview-mode':       ! props.readonly && isPreviewModeShown.value,
        }))


        onMounted((): Promise<void> => handleLoading(async (): Promise<void> => {
            await loadMediaItems()

            // arcanesoft().on(EVENTS.KEYBOARD_EVENT_KEYUP, (event) => {
            //     if (event.code === 'Delete')
            //         actions.openDeleteMediaTool()
            //
            //     if (event.code === 'Escape')
            //         actions.clearSelectedItems()
            //
            //     if (event.code === 'KeyR' && ! hasActiveMediaTool.value)
            //         actions.loadMediaItems()
            // })
        }))

        return {
            items,
            containerClasses,
        }
    },

    template: `
        <div class="media-items-container" :class="containerClasses">
            <MediaItem
                v-for="item in items" :item="item" :key="item.path"
                :selection="selection" :multiple="multiple"/>
        </div>
    `,
})
