import { defineComponent, PropType } from 'vue'
import { DatatableColumn, DatatableRow } from '../../types'
import { COLUMN_DATATYPE } from '../../enums'

import Actions from './datatype/actions'

type RowColumn = {
    column: DatatableColumn
    value:  any
}

export default defineComponent({
    name: 'v-datatable-row',

    props: {
        row: {
            type: Object as PropType<DatatableRow>,
            required: true,
        },
    },

    components: {
        Actions,
    },

    setup() {
        const isActionDatatype = (column: DatatableColumn): boolean => column.datatype === COLUMN_DATATYPE.ACTIONS

        const columnClasses = (rowColumn: RowColumn): string[] => {
            const column = rowColumn.column

            if (isActionDatatype(column))
                return ['v-datatable-row-actions']

            return [
                'v-datatable-row-col',
                `text-${column.align}`,
            ]
        }

        return {
            columnClasses,
            isActionDatatype,
        }
    },

    template: `
        <tr class="v-datatable-row">
            <td v-for="rowCol in row"
                class="small"
                :class="columnClasses(rowCol)">
                <Actions v-if="isActionDatatype(rowCol.column)" :actions="rowCol.value"/>
                <span v-else v-html="rowCol.value"></span>
            </td>
        </tr>
    `,
})
