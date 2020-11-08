import getters, { Getters } from './getters'
import actions, { Actions } from './actions'
import mutations, { Mutations } from './mutations'

type Store = Getters & Actions & Mutations

export default (): Store => ({
    ...actions(),
    ...getters(),
    ...mutations(),
})
