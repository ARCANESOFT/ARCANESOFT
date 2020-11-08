import { defineComponent } from 'vue'

import DatatableRows from './rows'
import DatatableColumns from './columns'

export default defineComponent({
    name: 'v-datatable-table',

    components: {
        DatatableColumns,
        DatatableRows,
    },

    template: `
        <table class="v-datatable-table">
            <DatatableColumns/>
            <DatatableRows/>
        </table>
    `,
})
