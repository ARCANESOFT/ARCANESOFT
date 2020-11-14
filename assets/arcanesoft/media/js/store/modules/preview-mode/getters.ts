import { computed, ComputedRef } from 'vue'
import state from './state'

export type Getters = {
    shown: ComputedRef<boolean>
}

export default (): Getters => {
    const shown = computed<boolean>(() => state.shown)

    return {
        shown,
    }
}
