import actions, { Actions } from './actions'
import getters, { Getters } from './getters'
import mutations, { Mutations } from './mutations'

export type Module = Actions & Getters & Mutations

export default (): Module => ({
    ...actions(),
    ...getters(),
    ...mutations(),
})
