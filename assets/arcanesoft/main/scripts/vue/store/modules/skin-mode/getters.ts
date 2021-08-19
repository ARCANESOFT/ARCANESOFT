import { computed, ComputedRef } from 'vue'
import state from './state'
import { SKIN_MODE } from '../../../../emuns'

export type Getters = {
    selectedMode: ComputedRef<SKIN_MODE>
    isLightMode: ComputedRef<boolean>
    isDarkMode: ComputedRef<boolean>
}

export default (): Getters => {
    const selectedMode = computed<SKIN_MODE>(() => {
        return state.skinMode
            || document.body.dataset.skinMode as SKIN_MODE
            || SKIN_MODE.LIGHT
    })

    const isLightMode = computed<boolean>(() => selectedMode.value === SKIN_MODE.LIGHT)
    const isDarkMode = computed<boolean>(() => selectedMode.value  === SKIN_MODE.DARK)

    return {
        selectedMode,
        isLightMode,
        isDarkMode,
    }
}
