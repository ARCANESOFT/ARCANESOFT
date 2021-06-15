import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import { useActions, useGetters } from '../../store'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-move-media-button',

    setup() {
        const { openMediaTool } = useActions()
        const { hasSelectedItems } = useGetters()

        const onClick = (): void => openMediaTool(MEDIA_TOOLS.MOVE_MEDIA)

        return {
            trans,
            hasSelectedItems,
            onClick,
        };
    },

    template: `
        <button @click.prevent="onClick" type="button"
                :title="trans('Move')" :disabled=" ! hasSelectedItems"
                class="btn btn-primary">
            <i class="fas fa-fw fa-dolly"></i>
        </button>
    `,
})
