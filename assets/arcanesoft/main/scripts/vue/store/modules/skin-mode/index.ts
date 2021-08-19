import getters, { Getters } from './getters'
import mutations, { Mutations } from './mutations'

export type Module = Getters & Mutations

export default (): Module => ({
    ...getters(),
    ...mutations(),
})
