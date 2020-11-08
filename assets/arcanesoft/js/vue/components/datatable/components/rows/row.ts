import { defineComponent, computed, PropType } from 'vue'
import { DatatableColumn } from '../../types'
import Actions from './actions'

export default defineComponent({
    name: 'v-datatable-row',

    props: {
        row: {
            required: true,
        },

        columns: {
            type: Object as PropType<DatatableColumn[]>,
            required: true,
        },
    },

    components: {
        Actions,
    },

    setup(props) {
        const columnClasses = (key: string): string[] => {
            if (key === 'actions')
                return ['v-datatable-row-actions']

            const column = <DatatableColumn> props.columns.filter((column: DatatableColumn) => column.key === key)[0]

            return [
                'v-datatable-row-col',
                `text-${column.align}`,
            ]
        }

        const filteredColumns = computed(() => {
            let row = {}

            props.columns.map(column => column.key).forEach((key) => {
                row[key] = props.row[key]
            })

            return row
        })

        return {
            filteredColumns,
            columnClasses,
        }
    },

    template: `
        <tr class="v-datatable-row">
            <td v-for="(column, name) in filteredColumns"
                class="small"
                :class="columnClasses(name)">
                <Actions v-if="name === 'actions'" :actions="column"/>
                <span v-else v-html="column"></span>
            </td>
        </tr>
    `,
})
