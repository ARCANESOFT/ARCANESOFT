import { defineComponent } from 'vue'
import { useActions, useGetters } from '../../store'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-preview-mode-button',

    setup() {
        const { togglePreviewMode } = useActions()
        const { isPreviewModeShown } = useGetters()

        const onClick = (): void => togglePreviewMode()

        return {
            trans,
            isPreviewModeShown,
            onClick,
        };
    },

    template: `
        <button @click.prevent="onClick" type="button"
                :title="trans('Preview Mode')"
                class="btn btn-outline-secondary" :class="{'active': isPreviewModeShown}">
            <i class="fas fa-fw fa-info-circle"></i>
        </button>
    `,
})
