import { COLUMN_DATATYPE } from '../../../enums'

import Actions from './actions'
import Avatar from './avatar'
import BadgeActive from './badge-active'
import BadgeCount from './badge-count'
import DescriptionList from './description-list'
import Plain from './plain'
import Status from './status'
import Tags from './tags'

export const datatypeComponent = (datatype: COLUMN_DATATYPE): string => {
    return (Object.values(COLUMN_DATATYPE).includes(datatype))
        ? 'v-dt-row-col-'+datatype
        : 'v-dt-row-col-'+COLUMN_DATATYPE.PLAIN;
}

export default {
    'v-dt-row-col-actions':          Actions,
    'v-dt-row-col-avatar':           Avatar,
    'v-dt-row-col-badge-active':     BadgeActive,
    'v-dt-row-col-badge-count':      BadgeCount,
    'v-dt-row-col-description-list': DescriptionList,
    'v-dt-row-col-plain':            Plain,
    'v-dt-row-col-status':           Status,
    'v-dt-row-col-tags':             Tags,
}
