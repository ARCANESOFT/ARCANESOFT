import { defineComponent } from 'vue'
import useStore from '../store'

import DatatableReloadButton from './buttons/reload'
import DatatableFilters from './filters'
import DatatablePagination from './pagination'
import DatatablePerPageSelect from './per-page-select'
import DatatableSearchInput from './search-input'

export default defineComponent({
    name: 'v-datatable-header',

    components: {
        DatatableFilters,
        DatatableSearchInput,
        DatatableReloadButton,
        DatatablePerPageSelect,
        DatatablePagination,
    },

    setup() {
        const { hasFilters, hasPagination } = useStore()

        return {
            hasFilters,
            hasPagination,
        }
    },

    template: `
        <div class="row g-2">
            <div class="col">
                <DatatableSearchInput/>
            </div>
            <div class="col-auto">
                <div class="btn-group" role="group">
                    <DatatableReloadButton/>
                    <DatatableFilters v-if="hasFilters"/>
                </div>
            </div>

            <div class="w-100 m-0" v-if="hasPagination"></div>
            <div class="col-auto" v-if="hasPagination">
                <DatatablePerPageSelect/>
            </div>
            <div class="col d-flex justify-content-end" v-if="hasPagination">
                <DatatablePagination/>
            </div>
        </div>
    `,
})
