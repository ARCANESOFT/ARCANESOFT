import { defineComponent } from 'vue'
import useTranslator from '../../../../../mixins/translator'

export default defineComponent({
    name: 'v-datatable-empty-state',

    setup() {
        const { trans } = useTranslator()

        return {
            info: trans('There is no entries to show'),
        }
    },

    template: `
        <div class="v-dt-card-body text-center">
            <img src="/assets/svg/arcanesoft/states/no-search-result.svg" :alt="info">
            <h4 class="fw-light text-muted m-0" v-text="info"></h4>
        </div>
    `,
})
