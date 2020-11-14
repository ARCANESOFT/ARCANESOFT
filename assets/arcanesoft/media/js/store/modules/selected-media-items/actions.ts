import { MediaItem } from '../../../types'
import getters from './getters'
import helpers from './helpers'
import mutations from './mutations'

export type Actions = {
    toggle(item: MediaItem): void
    clear(): void
}

export default (): Actions => {
    const { items } = getters()
    const { setItems } = mutations()
    const { isNotEmpty, isSelected } = helpers()

    const toggle = (item: MediaItem): void => {
        let selected = items.value

        if (isNotEmpty() && isSelected(item))
            selected = selected.filter((selected: MediaItem) => selected.path !== item.path)
        else
            selected.push(item)

        setItems(selected)
    }

    const clear = (): void => setItems([])

    return {
        toggle,
        clear,
    }
}
