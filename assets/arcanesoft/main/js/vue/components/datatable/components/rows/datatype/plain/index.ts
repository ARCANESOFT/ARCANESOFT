import { defineComponent, PropType } from 'vue'
import { DatatableRowColumn } from '../../../../types'

export default defineComponent({
    name: 'v-dt-row-col-plain',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    template: `<span v-html="rowColumn.value"></span>`,
})
