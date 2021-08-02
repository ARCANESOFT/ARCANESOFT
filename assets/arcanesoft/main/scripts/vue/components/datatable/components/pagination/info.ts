import { defineComponent, computed } from 'vue'
import { useGetters } from '../../store'
import useTranslator from '../../../../../mixins/translator'

export default defineComponent({
    name: 'v-pagination-info',

    setup() {
        const { pagination, hasPagination, isEmpty, rows } = useGetters()
        const { trans } = useTranslator()

        const info = computed<string>(() => {
            if ( ! isEmpty.value && hasPagination.value)
                return trans('Showing :from to :to out of :total entries', {
                    'from': pagination.value.from,
                    'to': pagination.value.to,
                    'total': pagination.value.total
                })

            return trans('Showing :total entries', {'total': rows.value.length})
        })

        return {
            info,
        }
    },

    template: `
        <div class="v-datatable-pagination-info small text-muted" v-text="info"></div>
    `,
})
