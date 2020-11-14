import * as ENUMS from './enums'
import ColumnDatatype from './types/column-datatype'

export type DatatablePageLink = {
    active: boolean
    label:  string | number
    url:    string | null
}

export type DatatablePagination = {
    current_page: number
    from:         number
    last_page:    number
    links:        DatatablePageLink[]
    path:         string
    per_page:     DatatablePerPage
    to:           number
    total:        number
}

export type DatatableRow = DatatableRowColumn[]

export type DatatableRowColumn = {
    column: DatatableColumn
    value:  ColumnDatatype
}

export type DatatableColumn = {
    key:      string
    label:    string
    align:    ENUMS.COLUMN_ALIGNMENT
    sortable: boolean
    escaped:  boolean
    datatype: ENUMS.COLUMN_DATATYPE
}

export type PerPageOption = {
    value: number
    label: string
}

export type DatatablePerPage = {
    selected: number
    options:  PerPageOption[]
}

export type DatatableSortByColumn = {
    key:       string
    direction: ENUMS.SORT_DIRECTION
}

export type DatatableFilterSelectOptions = {} // filter component options

export type DatatableFilter = {
    type:    ENUMS.FILTER_TYPE
    name:    string
    label:   string
    value:   any
    options: DatatableFilterSelectOptions
}

export type DatatableResponseMeta = {
    columns?:    DatatableColumn[]
    query: {
        sort_by:   DatatableSortByColumn[]
        filter_by: Array<any>
        search:    string | null
    }
    filters:     DatatableFilter[]
    pagination?: DatatablePagination
}

export type DatatableLinks = {
    first: string
    last:  string
    next:  string | null
    prev:  string | null
}

export type DatatableResponse = {
    items:  Object[],
    links?: DatatableLinks
    metas:  DatatableResponseMeta
}

export type ApiPayload = {
    url:    string | null
    params: Object
}
