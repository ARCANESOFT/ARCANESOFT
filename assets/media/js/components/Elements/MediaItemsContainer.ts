import { defineComponent, onMounted, computed } from 'vue'
import { EVENTS, DISPLAY_MODES } from '../../enums'
import currentDisplayMode from '../../store/getters/display-mode/current-display-mode'
import loadMediaItems from '../../store/actions/media/load-media-items'
import mediaItems from '../../computed/media/items'
import isPreviewModeActive from '../../computed/preview-mode/is-preview-mode-active'

import MediaItemComponent from './MediaItem'

export default defineComponent({
    name: 'v-media-items-container',

    components: {
        MediaItemComponent,
    },

    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type:    Boolean,
            default: false
        },
        selection: {
            type: String,
            default: 'any',
        },
    },

    setup(props) {
        // Methods
        function isDisplayModeSelected(mode: DISPLAY_MODES): boolean {
            return currentDisplayMode() === mode
        }

        // Computed
        // const hasActiveMediaTool = computed((): boolean => getters.getActiveMediaTool() !== null)
        const containerClasses = computed((): Object => ({
            'display-mode-grid':       isDisplayModeSelected(DISPLAY_MODES.GRID),
            'display-mode-icons':      isDisplayModeSelected(DISPLAY_MODES.ICONS),
            'display-mode-list':       isDisplayModeSelected(DISPLAY_MODES.LIST),
            'display-mode-thumbnails': isDisplayModeSelected(DISPLAY_MODES.THUMBNAILS),
            'with-preview-mode':       ! props.readonly && isPreviewModeActive.value,
        }))

        onMounted((): void => {
            loadMediaItems().then()

            // window['Foundation'].$on(EVENTS.KEYBOARD_EVENT_KEYUP, (event) => {
            //     if (event.code === 'Delete')
            //         actions.openDeleteMediaTool()
            //
            //     if (event.code === 'Escape')
            //         actions.clearSelectedItems()
            //
            //     if (event.code === 'KeyR' && ! hasActiveMediaTool.value)
            //         actions.loadMediaItems()
            // })
        })

        return {
            mediaItems,
            containerClasses,
        }
    },

    template: `
        <div class="media-items-container" :class="containerClasses">
            <MediaItemComponent
                v-for="item in mediaItems"
                :item="item" :key="item.path"
                :selection="selection" :multiple="multiple"/>
        </div>
    `,
})
