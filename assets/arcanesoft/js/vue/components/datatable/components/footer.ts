import { defineComponent } from 'vue'

import DatatablePagination from './pagination'
import DatatablePaginationInfo from './pagination/info'

export default defineComponent({
    name: 'v-datatable-footer',

    components: {
        DatatablePagination,
        DatatablePaginationInfo,
    },

    setup() {
        return {
            //
        }
    },

    template: `
        <div class="d-flex justify-content-between align-items-center">
            <DatatablePaginationInfo/>
            <DatatablePagination/>
        </div>
    `,
})
