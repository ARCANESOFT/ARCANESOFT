import { reactive } from 'vue'
import config from '../../../config'

export type State = {
    shown: boolean
}

export default reactive<State>({
    shown: config.previewMode
})
