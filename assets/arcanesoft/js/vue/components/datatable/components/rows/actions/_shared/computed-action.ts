import { computed } from 'vue'
import { DatatableRowAction } from '../../../../types'

export default (action: DatatableRowAction) => ({
    onlyIcon: computed<boolean>(() => action.icon !== null),
    isDisabled: computed<boolean>(() => action.allowed === false),
    isDestructive: computed<boolean>(() => action.name === 'delete'),
})
