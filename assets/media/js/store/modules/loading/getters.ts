import { computed, ComputedRef } from 'vue'
import state from './state'

export type Getters = {
    isLoading: ComputedRef<boolean>
}

export default (): Getters => {
    const isLoading = computed<boolean>(() => state.loading)

    return {
        isLoading,
    }
}
