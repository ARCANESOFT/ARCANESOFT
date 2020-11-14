import { defineComponent, computed, PropType } from 'vue'
import { DatatableRowColumn } from '../../../../types'
import { DatatypeBadgeCount } from '../../../../types/column-datatype'

export default defineComponent({
    name: 'v-dt-row-col-badge-count',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    setup(props) {
        const count = computed(() => <DatatypeBadgeCount> props.rowColumn.value)

        return {
            count,
        }
    },

    template: `
        <span class="badge border rounded-pill text-muted"
              :class="{'border-info': count > 0, 'border-danger': count < 0}">{{ count }}</span>
    `,
})
