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
        const { hasFilters, hasPagination, isEmpty } = useStore()

        return {
            hasFilters,
            hasPagination,
            isEmpty,
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

            <div v-if="hasPagination" class="w-100 m-0"></div>
            <div v-if="hasPagination" class="col-auto">
                <DatatablePerPageSelect/>
            </div>
            <div v-if="hasPagination && ! isEmpty" class="col d-flex justify-content-end">
                <DatatablePagination/>
            </div>
        </div>
    `,
})
