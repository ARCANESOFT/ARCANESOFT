import { defineComponent, computed, PropType } from 'vue'
import useStore from '../../store'
import { DatatableColumn, DatatableSortByColumn } from '../../types'
import { COLUMN_ALIGNMENT, SORT_BY_DIRECTION } from '../../enums'

export default defineComponent({
    name: 'v-datatable-column',

    props: {
        column: {
            type: Object as PropType<DatatableColumn>,
            required: true,
        },
    },

    setup({ column }) {
        const { changeSortBy, sortedByColumns } = useStore()

        const isSortable = computed<boolean>(() => column.sortable)
        const sortDirection = computed<SORT_BY_DIRECTION | null>(() => {
            const sortedColumn = sortedByColumns.value.find(
                (sortedColumn: DatatableSortByColumn) => sortedColumn.key === column.key
            )

            return sortedColumn !== undefined
                ? sortedColumn.direction
                : null
        })
        const columnClasses = computed<string[] | Object>(() => {
            if (column.key === 'actions')
                return ['text-right']

            return {
                'text-left'   : column.align === COLUMN_ALIGNMENT.LEFT,
                'text-center' : column.align === COLUMN_ALIGNMENT.CENTER,
                'text-right'  : column.align === COLUMN_ALIGNMENT.RIGHT,

                'v-datatable-column-sortable':  isSortable.value,
                'v-datatable-column-sort-asc':  sortDirection.value === SORT_BY_DIRECTION.ASC,
                'v-datatable-column-sort-desc': sortDirection.value === SORT_BY_DIRECTION.DESC,
            }
        })

        const changeSortDirection = (direction: string | null) => {
            switch (direction) {
                case SORT_BY_DIRECTION.ASC:
                    return SORT_BY_DIRECTION.DESC
                case SORT_BY_DIRECTION.DESC:
                    return null
                case null:
                default:
                    return SORT_BY_DIRECTION.ASC
            }
        }

        const getNewSortedColumnDirection = () => ({
            key: column.key,
            direction: changeSortDirection(sortDirection.value),
        })

        const setSortBy = async (): Promise<void> => await sortBy((): DatatableSortByColumn[] => [
            getNewSortedColumnDirection()
        ])

        const toggleSortBy = async (): Promise<void> => await sortBy((): DatatableSortByColumn[] => {
            const sortedColumns = sortedByColumns.value
            const exists = sortedColumns.find(
                (sortedColumn) => sortedColumn.key === column.key
            )

            if (exists === undefined) {
                return [
                    ...sortedColumns,
                    getNewSortedColumnDirection(),
                ]
            }

            return sortedColumns.map((sortedColumn) => {
                return (sortedColumn.key !== column.key)
                    ? sortedColumn
                    : getNewSortedColumnDirection()
            })
        })

        const sortBy = async (sortByCallback: () => DatatableSortByColumn[]): Promise<void> => {
            if (isSortable.value === false)
                return

            return await changeSortBy(
                sortByCallback().filter((column: DatatableSortByColumn) => column.direction !== null)
            )
        }

        return {
            columnClasses,
            setSortBy,
            toggleSortBy,
        }
    },

    template: `
        <th class="v-datatable-column"
            :class="columnClasses"
            @click.prevent="setSortBy"
            @click.shift.prevent="toggleSortBy">{{ column.label }}</th>
    `,
})
