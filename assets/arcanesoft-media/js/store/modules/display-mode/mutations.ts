import DISPLAY_MODES from '../../../enums/DISPLAY_MODES'
import state from './state'

export type Mutations = {
    setSelected(mode: DISPLAY_MODES): void
}

export default (): Mutations => {
    const setSelected = (mode: DISPLAY_MODES): void => {
        state.mode = mode
    }

    return {
        setSelected,
    }
}
