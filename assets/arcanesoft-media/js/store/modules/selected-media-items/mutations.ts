import { MediaItems } from '../../../types'
import state from './state'

export type Mutations = {
    setItems(items: MediaItems): void
}

export default (): Mutations => {
    const setItems = (items: MediaItems): void => {
        state.items = items
    }

    return {
        setItems,
    }
}
