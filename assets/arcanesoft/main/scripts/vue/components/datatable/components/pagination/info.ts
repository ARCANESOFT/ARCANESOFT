import { defineComponent, computed } from 'vue'
import { useGetters } from '../../store'
import useTranslator from '../../../../../mixins/translator'

export default defineComponent({
    name: 'v-pagination-info',

    setup() {
        const { pagination, isEmpty } = useGetters()
        const { trans } = useTranslator()

        const info = computed<string>(() =>
            isEmpty.value
                ? trans('Showing :total entries', {'total': pagination.value.total})
                : trans('Showing :from to :to out of :total entries', {'from': pagination.value.from, 'to': pagination.value.to, 'total': pagination.value.total})
        )

        return {
            info,
        }
    },

    template: `
        <div class="v-datatable-pagination-info small text-muted"
             v-text="info"></div>
    `,
})
