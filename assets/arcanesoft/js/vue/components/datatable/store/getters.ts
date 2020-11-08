import { computed, ComputedRef } from 'vue'
import useState from './state'
import {
    DatatableColumn,
    DatatableFilter,
    DatatableLinks,
    DatatablePagination,
    DatatablePerPage,
    DatatableResponseMeta,
    DatatableRow,
    DatatableSortByColumn
} from '../types'

export type Getters = {
    isLoading: ComputedRef<boolean>,
    isReady: ComputedRef<boolean>,
    isEmpty: ComputedRef<boolean>,
    rows: ComputedRef<DatatableRow[]>
    metas: ComputedRef<DatatableResponseMeta>
    columns: ComputedRef<DatatableColumn[]>
    filters: ComputedRef<DatatableFilter[]>
    hasFilters: ComputedRef<boolean>
    isFiltersApplied: ComputedRef<boolean>
    hasPagination: ComputedRef<boolean>
    paginationLinks: ComputedRef<DatatableLinks>
    pagination: ComputedRef<DatatablePagination>
    perPage: ComputedRef<DatatablePerPage>
    sortedByColumns: ComputedRef<DatatableSortByColumn[]>
}

export default (): Getters => {
    const state = useState()

    const rows = computed<DatatableRow[]>(() => state.results.items || [])
    const metas = computed<DatatableResponseMeta>(() => state.results.metas)
    const columns = computed<DatatableColumn[]>(() => metas.value?.columns ?? [])

    const filters = computed<DatatableFilter[]>(() => metas.value?.filters ?? [])
    const hasFilters = computed<boolean>(() => filters.value.length > 0)
    const isFiltersApplied = computed<boolean>(() => {
        const filteredBy = metas.value?.query?.filter_by ?? []

        if (filteredBy.length === 0)
            return false

        // Determine if does have a none default value
        return filters.value.some((filter: DatatableFilter) => {
            if (filteredBy[filter.name] !== undefined && filteredBy[filter.name] !== filter.value)
                return true
        })
    })

    const hasPagination = computed<boolean>(() => !! metas.value?.pagination)
    const paginationLinks = computed<DatatableLinks>(() => <DatatableLinks> (state.results.links || {}))
    const pagination = computed<DatatablePagination>(
        () => <DatatablePagination> (metas.value?.pagination ?? {})
    )
    const perPage = computed<DatatablePerPage>(() => pagination.value.per_page)

    const sortedByColumns = computed<DatatableSortByColumn[]>(() => metas.value?.query?.sort_by ?? [])

    const isReady = computed<boolean>(() => state.ready)
    const isLoading = computed<boolean>(() => state.loading)
    const isEmpty = computed<boolean>(() => rows.value.length === 0)

    return {
        isLoading,
        isReady,
        isEmpty,
        rows,
        metas,
        columns,
        filters,
        hasFilters,
        isFiltersApplied,
        hasPagination,
        paginationLinks,
        pagination,
        perPage,
        sortedByColumns,
    }
}
