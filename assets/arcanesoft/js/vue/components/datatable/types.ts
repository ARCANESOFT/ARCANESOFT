import * as ENUMS from './enums'

type NullableString = string | null

export type DatatablePageLink = {
    active: boolean
    label:  string | number
    url:    NullableString
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

export type DatatableRow = Object

export type DatatableColumn = {
    key:      string
    label:    string
    align:    ENUMS.COLUMN_ALIGNMENT
    sortable: boolean
    escaped:  boolean
}

export type DatatableRowAction = {
    action:  string
    allowed: boolean
    icon:    NullableString
    label:   string
    name:    string
    type:    ENUMS.ACTION_TYPE
}

export type DatatableRowActions = {
    [key: string]: DatatableRowAction
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
    direction: ENUMS.SORT_BY_DIRECTION
}

export type DatatableFilter = {
    type:    ENUMS.FILTER_TYPE
    name:    string
    label:   string
    value:   any
    options: DatatableFilterSelectOptions | Object // filter component options
}

export type DatatableFilterSelectOptions = {
}

export type DatatableResponseMeta = {
    columns?:    DatatableColumn[]
    query: {
        sort_by:   DatatableSortByColumn[]
        filter_by: Array<any>
        search:    NullableString
    }
    filters:     DatatableFilter[]
    pagination?: DatatablePagination
}

export type DatatableLinks = {
    first: string
    last:  string
    next:  NullableString
    prev:  NullableString
}

export type DatatableResponse = {
    items:  DatatableRow[]
    links?: DatatableLinks
    metas:  DatatableResponseMeta
}

export type ApiPayload = {
    url:    string | null
    params: Object
}
