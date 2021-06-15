import { defineComponent } from 'vue'
import { useActions, useGetters } from '../../store'
import { MEDIA_TOOLS } from '../../enums'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-rename-media-button',

    setup() {
        const { openMediaTool } = useActions()
        const { hasSelectedItems } = useGetters()

        const onClick = (): void => {
            if (hasSelectedItems.value)
                openMediaTool(MEDIA_TOOLS.RENAME_MEDIA)
        }

        return {
            trans,
            hasSelectedItems,
            onClick,
        }
    },

    template: `
        <button @click.prevent="onClick" type="button"
                :title="trans('Rename')" :disabled=" ! hasSelectedItems"
                class="btn btn-warning">
            <i class="fas fa-fw fa-i-cursor"></i>
        </button>
    `,
})
