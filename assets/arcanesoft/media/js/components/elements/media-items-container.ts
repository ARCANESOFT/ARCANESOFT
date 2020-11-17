import { defineComponent, onMounted, computed } from 'vue'
import { useActions, useGetters, useHelpers } from '../../store'
import { DISPLAY_MODES } from '../../enums'

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
        const { loadItems } = useActions()
        const { items, isPreviewModeShown } = useGetters()
        const { isDisplayModeSelected } = useHelpers()

        // Computed
        const containerClasses = computed<Object>(() => ({
            'display-mode-grid':       isDisplayModeSelected(DISPLAY_MODES.GRID).value,
            'display-mode-icons':      isDisplayModeSelected(DISPLAY_MODES.ICONS).value,
            'display-mode-list':       isDisplayModeSelected(DISPLAY_MODES.LIST).value,
            'display-mode-thumbnails': isDisplayModeSelected(DISPLAY_MODES.THUMBNAILS).value,
            'with-preview-mode':       ! props.readonly && isPreviewModeShown.value,
        }))


        onMounted(async (): Promise<void> => {
            await loadItems()
        })

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
