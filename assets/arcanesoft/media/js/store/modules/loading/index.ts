import actions, { Actions } from './actions'
import getters, { Getters } from './getters'
import mutations, { Mutations } from './mutations'
import helpers, { Helpers } from './helpers'

export type Module = Actions & Getters & Helpers & Mutations

export default (): Module => ({
    ...actions(),
    ...getters(),
    ...helpers(),
    ...mutations(),
})
