import { defineComponent } from 'vue'
import { useActions } from '../../store'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-close-button',

    setup() {
        const { closeMediaTool } = useActions()

        const onClick = () => closeMediaTool()

        return {
            trans,
            onClick,
        };
    },

    template: `
        <button @click.prevent="onClick" type="button"
                class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-times"></i> {{ trans('Close') }}
        </button>
    `,
})
