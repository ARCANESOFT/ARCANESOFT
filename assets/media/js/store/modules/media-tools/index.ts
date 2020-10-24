import getters, { Getters } from './getters'
import actions, { Actions } from './actions'
import mutations, { Mutations } from './mutations'
import helpers, { Helpers } from './helpers'

export type Module = Actions & Getters & Mutations & Helpers

export default (): Module => ({
    ...getters(),
    ...actions(),
    ...mutations(),
    ...helpers(),
})
