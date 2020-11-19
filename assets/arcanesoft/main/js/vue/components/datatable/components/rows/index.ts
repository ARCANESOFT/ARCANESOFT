import { defineComponent } from 'vue'
import { useGetters } from '../../store'
import { DatatableRowColumn } from '../../types'

import components, { datatypeComponent } from './datatype'

export default defineComponent({
    name: 'v-dt-rows',

    components,

    setup() {
        const { draw, rows } = useGetters()

        const columnClasses = (rowColumn: DatatableRowColumn): string[] => {
            const column = rowColumn.column

            return [
                'v-dt-row-col',
                `v-dt-datatype-${column.datatype}`,
                `text-${column.align}`,
            ]
        }

        return {
            columnClasses,
            datatypeComponent,
            draw,
            rows,
        }
    },

    template: `
        <tbody>
            <tr v-for="row in rows" class="v-dt-row">
                <td v-for="col in row" :class="columnClasses(col)">
                    <component :is="datatypeComponent(col.column.datatype)" :row-column="col"/>
                </td>
            </tr>
        </tbody>
    `,
})
