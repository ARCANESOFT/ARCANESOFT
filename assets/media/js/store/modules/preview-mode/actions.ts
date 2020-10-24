import getters from './getters'
import mutations from './mutations'

export type Actions = {
    toggle(): void
}

export default (): Actions => {
    const { shown } = getters()
    const { setShown } = mutations()

    const toggle = (): void => setShown( ! shown.value)

    return {
        toggle,
    }
}
