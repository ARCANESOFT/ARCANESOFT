import { defineComponent } from 'vue'
import openDeleteMediaTool from '../../store/actions/tools/open-delete-media-tool'
import hasSelectedItems from '../../computed/media/has-selected-items'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-delete-media-button',

    mixins: [
        translator,
    ],

    setup() {
        return {
            openTool: (): void => {
                openDeleteMediaTool()
            },
            hasSelectedItems,
        }
    },

    template: `
        <button @click.prevent="openTool" type="button"
                :disabled=" ! hasSelectedItems"
                :title="trans('Delete [Del]')" class="btn btn-danger">
            <i class="far fa-fw fa-trash-alt"></i>
        </button>
    `,
})
