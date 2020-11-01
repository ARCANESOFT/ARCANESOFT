import { computed, ComputedRef } from 'vue'
import { MEDIA_TOOLS } from '../../../enums'
import state from './state'

export type Getters = {
    hasActive: ComputedRef<boolean>
}

export default (): Getters => {
    const hasActive = computed<boolean>(() => state.tool !== null && state.tool in MEDIA_TOOLS)

    return {
        hasActive,
    }
}
