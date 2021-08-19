import state from './state'
import actions from './actions'
import { SKIN_MODE } from '../../../../emuns'

export type Mutations = {
    setSkinMode(mode: SKIN_MODE): void
    toggleMode(): void
}

export default (): Mutations => {
    const { applySkinMode } = actions()

    const setSkinMode = (mode: SKIN_MODE): void => {
        state.skinMode = mode
        applySkinMode(mode)
    }

    const toggleMode = (): void => {
        setSkinMode(
            state.skinMode === SKIN_MODE.LIGHT
                ? SKIN_MODE.DARK
                : SKIN_MODE.LIGHT
        )
    }

    return {
        setSkinMode,
        toggleMode,
    }
}
