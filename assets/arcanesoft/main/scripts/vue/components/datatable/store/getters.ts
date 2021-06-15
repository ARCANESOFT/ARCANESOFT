import { computed, ComputedRef } from 'vue'
import { useState } from './state'
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
    draw: ComputedRef<number>,
    payloadUrl: ComputedRef<string>,
    payloadParams: ComputedRef<Object>,
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

    const draw = computed<number>((): number => state.draw)
    const payloadUrl = computed<string>((): string => state.payload.url)
    const payloadParams = computed<Object>((): Object => state.payload.params)

    const columns = computed<DatatableColumn[]>(() => state.results.metas?.columns ?? [])
    const rows = computed<DatatableRow[]>(
        () => (state.results.items || []).map((row) => columns.value.map((column) => ({
            column: column,
            value:  row[column.key],
        })))
    )
    const metas = computed<DatatableResponseMeta>(() => state.results.metas)

    const filters = computed<DatatableFilter[]>(() => state.results.metas?.filters ?? [])
    const hasFilters = computed<boolean>(() => filters.value.length > 0)
    const isFiltersApplied = computed<boolean>(() => {
        const filteredBy = state.results.metas?.query?.filter_by ?? []

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
        draw,
        payloadUrl,
        payloadParams,
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
