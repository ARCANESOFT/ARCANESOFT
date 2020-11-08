import { defineComponent, PropType } from 'vue'
import { DatatableRowActions } from '../../types'
import Action from './action'

export default defineComponent({
    name: 'v-datatable-row-actions',

    props: {
        actions: {
            type: Object as PropType<DatatableRowActions>,
            required: true,
        },
    },

    components: {
        Action,
    },

    template: `
        <Action v-for="action in actions" :action="action"/>
    `,
})
