import { reactive } from 'vue'
import { MEDIA_TOOLS } from '../../../enums'

export type State = {
    tool: MEDIA_TOOLS | null
}

export default reactive<State>({
    tool: null
})
