import { defineComponent } from 'vue'
import { DatatableRowColumn } from '../../types'
import { COLUMN_DATATYPE } from '../../enums'
import useGetters from '../../store/getters'

import Actions from './datatype/actions'
import Avatar from './datatype/avatar'
import BadgeActive from './datatype/badge-active'
import BadgeCount from './datatype/badge-count'
import Plain from './datatype/plain'

export default defineComponent({
    name: 'v-datatable-rows',

    components: {
        'v-datatable-row-col-actions':      Actions,
        'v-datatable-row-col-avatar':       Avatar,
        'v-datatable-row-col-badge-active': BadgeActive,
        'v-datatable-row-col-badge-count':  BadgeCount,
        'v-datatable-row-col-plain':        Plain,
    },

    setup() {
        const { draw, rows } = useGetters()

        const columnClasses = (rowColumn: DatatableRowColumn): string[] => {
            const column = rowColumn.column

            if (column.datatype === COLUMN_DATATYPE.ACTIONS)
                return [
                    'v-datatable-row-actions',
                    'small',
                ]

            return [
                'v-datatable-row-col',
                'small',
                `text-${column.align}`,
            ]
        }

        const datatypeComponent = (rowColumn: DatatableRowColumn): string => {
            switch (rowColumn.column.datatype) {
                case COLUMN_DATATYPE.ACTIONS:
                    return 'v-datatable-row-col-actions'

                case COLUMN_DATATYPE.AVATAR:
                    return 'v-datatable-row-col-avatar'

                case COLUMN_DATATYPE.BADGE_ACTIVE:
                    return 'v-datatable-row-col-badge-active'

                case COLUMN_DATATYPE.BADGE_COUNT:
                    return 'v-datatable-row-col-badge-count'

                case COLUMN_DATATYPE.PLAIN:
                default:
                    return 'v-datatable-row-col-plain'
            }
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
            <tr v-for="row in rows" class="v-datatable-row">
                <td v-for="col in row"
                    :class="columnClasses(col)">
                    <component :is="datatypeComponent(col)" :row-column="col"/>
                </td>
            </tr>
        </tbody>
    `,
})
