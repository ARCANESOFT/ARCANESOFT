import { computed, ComputedRef } from 'vue'

type Getters = {
    isMultiple:          ComputedRef<boolean>,
    isSingle:            ComputedRef<boolean>,
    isSearchable:        ComputedRef<boolean>,
    shouldShowCloseIcon: ComputedRef<boolean>,
}

export default (props): Getters => {
    const isMultiple = computed((): boolean => props.multiple)
    const isSingle = computed((): boolean => ! props.multiple)
    const isSearchable = computed((): boolean => props.searchable)

    const shouldShowCloseIcon = computed((): boolean => {
        return props.clearable
            && ! props.disabled
            // && instance.hasValue
            // && (this.hasUndisabledValue || instance.allowClearingDisabled)
    })


    return {
        isMultiple,
        isSingle,
        isSearchable,
        shouldShowCloseIcon,
    }
}
