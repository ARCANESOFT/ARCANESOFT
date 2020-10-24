import { computed, ComputedRef } from 'vue'
import state from './state'

export type Getters = {
    current: ComputedRef<string>
    isRoot:  ComputedRef<boolean>
}

export default (): Getters => {
    const current = computed<string>(() => state.location)
    const isRoot  = computed<boolean>(() => state.location === '/')

    return {
        current,
        isRoot,
    }
}
