import { reactive } from 'vue'
import { MediaItems } from '../../../types'

export type State = {
    items: MediaItems
}

export default reactive<State>({
    items: [],
})
