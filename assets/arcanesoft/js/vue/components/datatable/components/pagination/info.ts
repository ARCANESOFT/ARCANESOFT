import { defineComponent, computed } from 'vue'
import getters from '../../store/getters'

export default defineComponent({
    name: 'v-pagination-info',

    setup() {
        const { pagination } = getters()
        const info = computed<string>(() =>
            `Showing ${pagination.value.from} to ${pagination.value.to} out of ${pagination.value.total} entries`
        )

        return {
            info,
        }
    },

    template: `
        <div class="v-datatable-pagination-info">{{ info }}</div>
    `,
})
