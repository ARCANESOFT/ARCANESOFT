import { ACTION_TYPE } from '../enums'

export type DatatypeAction = {
    action:  string
    allowed: boolean
    icon:    string | null
    label:   string
    name:    string
    type:    ACTION_TYPE
}

export type DatatypeAvatar = {
    image: string,
    alt:   string,
}

export type DatatypeBadgeActive = {
    active: boolean,
    label:  string | null,
    icon:   boolean,
}

export type DatatypeBadgeCount = number

export type DatatypeDetail = {
    term: string
    description: any
}

export type DatatypeDetails = DatatypeDetail[]

export type DatatypeStatus = {
    type: string
    label: string
}

export type DatatypeTag = {
    color: string
    label: string
}

export type DatatypeTags = DatatypeTag[]

export type DatatypePlain = string | number | boolean | null

type DatatableColumnDatatype = DatatypeAction[] | DatatypeAvatar | DatatypeBadgeActive | DatatypeBadgeCount | DatatypeDetails | DatatypePlain | DatatypeStatus | DatatypeTags

export default DatatableColumnDatatype
