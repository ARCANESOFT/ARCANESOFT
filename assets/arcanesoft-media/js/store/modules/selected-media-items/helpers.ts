import { computed, ComputedRef } from 'vue'
import { MediaItem } from '../../../types'
import getters from './getters'

export type Helpers = {
    isSelected(item: MediaItem): ComputedRef<boolean>
    isEmpty(): boolean
    isNotEmpty(): boolean
}

export default () => {
    const { items, count } = getters()

    const isSelected = (item: MediaItem): ComputedRef<boolean> => computed(
        () => items.value.filter((selected: MediaItem) => selected.path === item.path).length > 0
    )

    const isEmpty = (): boolean => count.value === 0
    const isNotEmpty = (): boolean => ! isEmpty()

    return {
        isSelected,
        isEmpty,
        isNotEmpty,
    }
}
