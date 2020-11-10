import { defineComponent, PropType } from 'vue'
import { DatatableRowAction } from '../../../../types'
import Action from './action'

export default defineComponent({
    name: 'v-datatable-row-actions',

    props: {
        actions: {
            type: Object as PropType<DatatableRowAction[]>,
            required: true,
        },
    },

    components: {
        Action,
    },

    setup() {
        return {
            //
        }
    },

    template: `
        <Action v-for="action in actions" :action="action"/>
    `,
})
