import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import mediaTools from '../../store/modules/media-tools'
import selectedMediaItems from '../../store/modules/selected-media-items'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-delete-media-button',

    setup() {
        const { open: openMediaTool } = mediaTools()
        const { isNotEmpty: hasSelectedItems } = selectedMediaItems()

        function openDeleteMediaTool(): void {
            openMediaTool(MEDIA_TOOLS.DELETE_MEDIA)
        }

        return {
            trans,
            hasSelectedItems,
            openDeleteMediaTool,
        };
    },

    template: `
        <button @click.prevent="openDeleteMediaTool" type="button"
                :disabled=" ! hasSelectedItems"
                :title="trans('Delete [Del]')" class="btn btn-danger">
            <i class="far fa-fw fa-trash-alt"></i>
        </button>
    `,
})
