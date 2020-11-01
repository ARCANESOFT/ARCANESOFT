import { defineComponent } from 'vue'
import mediaTools from '../../store/modules/media-tools'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-close-button',

    setup() {
        const { close } = mediaTools()

        return {
            trans,
            close,
        };
    },

    template: `
        <button @click.prevent="close" type="button"
                class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-times"></i> {{ trans('Close') }}
        </button>
    `,
})
