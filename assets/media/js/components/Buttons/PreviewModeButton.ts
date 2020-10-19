import { defineComponent } from 'vue'
import togglePreviewMode from '../../store/actions/preview-mode/toggle-preview-mode'
import isActive from '../../computed/preview-mode/is-preview-mode-active'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-preview-mode-button',

    mixins: [
        translator,
    ],

    setup() {
        return {
            isActive,
        }
    },

    template: `
        <button @click.prevent="togglePreviewMode" type="button"
                :title="trans('Preview Mode')"
                class="btn btn-light" :class="{'active': isActive}">
            <i class="fas fa-fw fa-info-circle"></i>
        </button>
    `,
})
