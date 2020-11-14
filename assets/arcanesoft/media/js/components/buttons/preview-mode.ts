import { defineComponent } from 'vue'
import previewMode from '../../store/modules/preview-mode'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-preview-mode-button',

    setup() {
        const { shown: isShown, toggle } = previewMode()

        return {
            trans,
            isShown,
            toggle,
        };
    },

    template: `
        <button @click.prevent="toggle" type="button"
                :title="trans('Preview Mode')"
                class="btn btn-outline-secondary" :class="{'active': isShown}">
            <i class="fas fa-fw fa-info-circle"></i>
        </button>
    `,
})
