import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import { useActions, useGetters } from '../../store'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-delete-media-button',

    setup() {
        const { openMediaTool } = useActions()
        const { hasSelectedItems } = useGetters()

        const onClick = (): void => openMediaTool(MEDIA_TOOLS.DELETE_MEDIA)


        return {
            trans,
            hasSelectedItems,
            onClick,
        };
    },

    template: `
        <button @click.prevent="onClick" type="button"
                :disabled=" ! hasSelectedItems"
                :title="trans('Delete')" class="btn btn-danger">
            <i class="far fa-fw fa-trash-alt"></i>
        </button>
    `,
})
