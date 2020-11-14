import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import mediaTools from '../../store/modules/media-tools'
import selectedMediaItems from '../../store/modules/selected-media-items'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-move-media-button',

    setup() {
        const { open: openMediaTool } = mediaTools()
        const { isNotEmpty: hasSelectedMedia } = selectedMediaItems()

        function openDeleteMediaTool(): void {
            openMediaTool(MEDIA_TOOLS.MOVE_MEDIA)
        }

        return {
            trans,
            hasSelectedMedia,
            openDeleteMediaTool,
        };
    },

    template: `
        <button @click.prevent="openDeleteMediaTool" type="button"
                :title="trans('Move')" :disabled=" ! hasSelectedMedia"
                class="btn btn-primary">
            <i class="fas fa-fw fa-dolly"></i>
        </button>
    `,
})
