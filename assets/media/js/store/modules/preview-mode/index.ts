import getters, { Getters } from './getters'
import actions, { Actions } from './actions'
import mutations, { Mutations } from './mutations'

export type Module = Getters & Actions & Mutations

export default (): Module => ({
    ...getters(),
    ...mutations(),
    ...actions(),
})
