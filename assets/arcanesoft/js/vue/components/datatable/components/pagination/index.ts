import { defineComponent, computed } from 'vue'
import { DatatablePageLink } from '../../types'
import useStore from '../../store'

import PaginationLink from './pagination-link'

export default defineComponent({
    name: 'v-datatable-pagination',

    components: {
        PaginationLink,
    },

    setup() {
        const { pagination } = useStore()

        const links = computed<DatatablePageLink[]>(() => pagination.value.links)

        return {
            links,
        }
    },

    template: `
        <nav aria-label="...">
            <ul class="v-datatable-pagination">
                <PaginationLink v-for="link in links" :link="link"/>
            </ul>
        </nav>
    `,
})
