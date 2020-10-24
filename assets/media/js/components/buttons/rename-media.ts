import { defineComponent, computed } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import mediaTools from '../../store/modules/media-tools'
import selectedMediaItems from '../../store/modules/selected-media-items'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-rename-media-button',

    setup() {
        const { open: openMediaTool } = mediaTools()
        const { count } = selectedMediaItems()
        const hasSelectedMedia = computed((): boolean => count.value === 1)

        function openRenameMediaTool(): void {
            if (hasSelectedMedia.value)
                openMediaTool(MEDIA_TOOLS.RENAME_MEDIA)
        }

        return {
            trans,
            hasSelectedMedia,
            openRenameMediaTool,
        }
    },

    template: `
        <button @click.prevent="openRenameMediaTool" type="button"
                :title="trans('Rename')" :disabled=" ! hasSelectedMedia"
                class="btn btn-warning">
            <i class="fas fa-fw fa-i-cursor"></i>
        </button>
    `,
})
