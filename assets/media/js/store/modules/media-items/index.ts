import getters, { Getters } from './getters'
import actions, { Actions } from './actions'
import mutations, { Mutations } from './mutations'
import helpers, { Helpers } from "./helpers"

export type Module = Getters & Mutations & Actions & Helpers

export default (): Module => ({
    ...getters(),
    ...mutations(),
    ...actions(),
    ...helpers(),
})
