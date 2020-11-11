import { ACTION_TYPE } from '../enums'
import {DatatableColumn} from "../types";

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

export type DatatypePlain = string | number | boolean | null

type DatatableColumnDatatype = DatatypePlain | DatatypeBadgeActive | DatatypeBadgeCount | DatatypeAvatar | DatatypeAction[]

export default DatatableColumnDatatype
