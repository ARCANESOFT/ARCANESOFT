import { defineComponent, PropType } from 'vue'
import { DatatableRowColumn } from '../../../../types'

export default defineComponent({
    name: 'v-dt-row-col-avatar',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    template: `
        <div class="avatar avatar-sm rounded-circle bg-light">
            <img :src="rowColumn.value.image" :alt="rowColumn.value.alt">
        </div>
    `,
})
