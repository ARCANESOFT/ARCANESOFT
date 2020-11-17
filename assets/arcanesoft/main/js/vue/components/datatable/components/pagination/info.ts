import { defineComponent, computed } from 'vue'
import getters from '../../store/getters'

export default defineComponent({
    name: 'v-pagination-info',

    setup() {
        const { pagination, isEmpty } = getters()
        const info = computed<string>(() =>
            isEmpty.value
                ? `Showing ${pagination.value.total} entries`
                : `Showing ${pagination.value.from} to ${pagination.value.to} out of ${pagination.value.total} entries`
        )

        return {
            info,
        }
    },

    template: `
        <div class="v-datatable-pagination-info small text-muted">{{ info }}</div>
    `,
})
