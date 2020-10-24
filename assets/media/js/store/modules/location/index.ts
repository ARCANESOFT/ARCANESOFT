import getters, { Getters } from './getters'
import mutations, { Mutations } from './mutations'
import helpers, { Helpers } from './helpers'

export type Module = Getters & Mutations & Helpers

export default (): Module => ({
    ...getters(),
    ...mutations(),
    ...helpers(),
})
