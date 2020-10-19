import { defineComponent, computed } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import mutations from '../../store/mutations'
import translator from '../../mixins/translator'
import selectedMediaItemsCount from '../../computed/media/selected-items-count'

export default defineComponent({
    name: 'v-rename-media-button',

    mixins: [
        translator,
    ],

    setup() {
        const hasSelectedMedia = computed((): boolean => selectedMediaItemsCount.value === 1)

        function renameMedia(): void {
            if (hasSelectedMedia.value)
                mutations.setActiveMediaTool(MEDIA_TOOLS.RENAME_MEDIA)
        }

        return {
            renameMedia,
            hasSelectedMedia,
        }
    },

    template: `
        <button @click.prevent="renameMedia" type="button"
                :title="trans('Rename')" :disabled=" ! hasSelectedMedia"
                class="btn btn-warning">
            <i class="fas fa-fw fa-i-cursor"></i>
        </button>
    `,
})
