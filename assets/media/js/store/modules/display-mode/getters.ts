import { computed, ComputedRef } from 'vue'
import DISPLAY_MODES from '../../../enums/DISPLAY_MODES'
import state from './state'

export type Getters = {
    selected: ComputedRef<DISPLAY_MODES>
}

export default (): Getters => {
    const selected = computed<DISPLAY_MODES>(() => state.mode)

    return {
        selected,
    }
}
