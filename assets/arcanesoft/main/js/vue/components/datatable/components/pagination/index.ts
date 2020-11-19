import { defineComponent, computed } from 'vue'
import { useGetters } from '../../store'
import { DatatablePageLink } from '../../types'

import PaginationLink from './pagination-link'

export default defineComponent({
    name: 'v-datatable-pagination',

    components: {
        PaginationLink,
    },

    setup() {
        const { pagination } = useGetters()

        const links = computed<DatatablePageLink[]>(() => pagination.value.links)

        return {
            links,
        }
    },

    template: `
        <nav aria-label="...">
            <ul class="v-dt-pagination justify-content-end mb-0">
                <PaginationLink v-for="link in links" :link="link"/>
            </ul>
        </nav>
    `,
})
