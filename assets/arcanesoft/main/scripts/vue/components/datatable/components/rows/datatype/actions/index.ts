import { defineComponent, PropType } from 'vue'
import { DatatableRowColumn } from '../../../../types'
import Action from './action'

export default defineComponent({
    name: 'v-dt-row-col-actions',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    components: {
        Action,
    },

    template: `
        <Action v-for="action in rowColumn.value" :action="action" :key="action.name"/>
    `,
})
