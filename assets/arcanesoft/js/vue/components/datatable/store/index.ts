import useGetters, { Getters } from './getters'
import useActions, { Actions } from './actions'
import useMutations, { Mutations } from './mutations'

type Store = Getters & Actions & Mutations

export default (): Store => ({
    ...useActions(),
    ...useGetters(),
    ...useMutations(),
})
