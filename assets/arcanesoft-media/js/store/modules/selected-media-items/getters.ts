import { ref, computed, Ref, ComputedRef } from 'vue'
import { MediaItems } from '../../../types'
import state from './state'

export type Getters = {
    items: ComputedRef<MediaItems>
    count: ComputedRef<number>
}

export default (): Getters => {
    const items = computed<MediaItems>(() => state.items)
    const count = computed<number>(() => items.value.length)

    return {
        items,
        count,
    }
}
