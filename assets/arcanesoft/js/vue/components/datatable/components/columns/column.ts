import { defineComponent, computed, PropType } from 'vue'
import useGetters from '../../store/getters'
import useActions from '../../store/actions'
import { DatatableColumn, DatatableSortByColumn } from '../../types'
import { COLUMN_ALIGNMENT, SORT_DIRECTION } from '../../enums'

export default defineComponent({
    name: 'v-dt-column',

    props: {
        column: {
            type: Object as PropType<DatatableColumn>,
            required: true,
        },
    },

    setup(props) {
        const { sortedByColumns } = useGetters()
        const { changeSortBy } = useActions()

        const isSortable = computed<boolean>(() => props.column.sortable)
        const sortDirection = computed<SORT_DIRECTION | null>(() => {
            const sortedColumn = sortedByColumns.value.find(
                (sortedColumn: DatatableSortByColumn) => sortedColumn.key === props.column.key
            )

            return sortedColumn !== undefined
                ? sortedColumn.direction
                : null
        })
        const columnClasses = computed<string[] | Object>(() => {
            if (props.column.key === 'actions')
                return ['text-right']

            return {
                'text-left'   : props.column.align === COLUMN_ALIGNMENT.LEFT,
                'text-center' : props.column.align === COLUMN_ALIGNMENT.CENTER,
                'text-right'  : props.column.align === COLUMN_ALIGNMENT.RIGHT,

                'v-dt-column-sortable':  isSortable.value,
                'v-dt-column-sort-asc':  sortDirection.value === SORT_DIRECTION.ASC,
                'v-dt-column-sort-desc': sortDirection.value === SORT_DIRECTION.DESC,
            }
        })

        const changeSortDirection = (direction: string | null) => {
            switch (direction) {
                case SORT_DIRECTION.ASC:
                    return SORT_DIRECTION.DESC
                case SORT_DIRECTION.DESC:
                    return null
                case null:
                default:
                    return SORT_DIRECTION.ASC
            }
        }

        const getNewSortedColumnDirection = () => ({
            key:       props.column.key,
            direction: changeSortDirection(sortDirection.value),
        })

        const onClick = async (event): Promise<void> => await sortBy(
            (): DatatableSortByColumn[] => event.shiftKey ? toggleMultiple() : toggleSingle()
        )

        const toggleSingle = (): DatatableSortByColumn[] => [
            getNewSortedColumnDirection()
        ]

        const toggleMultiple = (): DatatableSortByColumn[] => {
            const sortedColumns = sortedByColumns.value
            const exists = sortedColumns.find(
                (sortedColumn) => sortedColumn.key === props.column.key
            )

            if (exists === undefined) {
                return [
                    ...sortedColumns,
                    getNewSortedColumnDirection(),
                ]
            }

            return sortedColumns.map((sortedColumn) => {
                return (sortedColumn.key !== props.column.key)
                    ? sortedColumn
                    : getNewSortedColumnDirection()
            })
        }

        const sortBy = async (sortByCallback: () => DatatableSortByColumn[]): Promise<void> => {
            if (isSortable.value === false)
                return

            return await changeSortBy(
                sortByCallback()
                    .filter((column: DatatableSortByColumn) => column.direction !== null)
            )
        }

        return {
            columnClasses,
            onClick,
        }
    },

    template: `
        <th class="v-dt-column"
            :class="columnClasses"
            @click.prevent="onClick">{{ column.label }}</th>
    `,
})
