import { defineComponent, computed } from 'vue'
import { DatatablePageLink } from '../../types'
import useGetters from '../../store/getters'

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
            <ul class="v-datatable-pagination justify-content-end mb-0">
                <PaginationLink v-for="link in links" :link="link"/>
            </ul>
        </nav>
    `,
})
