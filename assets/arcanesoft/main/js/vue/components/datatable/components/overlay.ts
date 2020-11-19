import { defineComponent } from 'vue'
import useTranslator from '../../../../mixins/translator'

export default defineComponent({
    name: 'v-dt-card-overlay',

    setup() {
        const { trans } = useTranslator()

        return {
            trans,
        }
    },

    template: `
        <div class="v-dt-card-overlay">
            <div class="v-dt-card-spinner spinner-border" role="status">
                <span class="visually-hidden" v-text="trans('Loading...')"></span>
            </div>
        </div>
    `,
})
