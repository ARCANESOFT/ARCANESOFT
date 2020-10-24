import { computed, ComputedRef } from 'vue'
import DISPLAY_MODES from '../../../enums/DISPLAY_MODES'
import state from './state'

export type Helpers = {
    isSelected(mode: DISPLAY_MODES): ComputedRef<boolean>
}

export default (): Helpers => {
    const isSelected = (mode: DISPLAY_MODES): ComputedRef<boolean> => computed<boolean>(() => state.mode === mode)

    return {
        isSelected,
    }
}
