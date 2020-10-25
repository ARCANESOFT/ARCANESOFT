import arcanesoft from '../../../../helpers/arcanesoft'
import { COMPONENT_RELOAD_EVENT } from '../events'

export default () => {
    const reload = (component: string) => {
        arcanesoft().emit(COMPONENT_RELOAD_EVENT, component)
    }

    return {
        reload,
    }
}
