import { reactive } from 'vue'
import DISPLAY_MODES from '../../../enums/DISPLAY_MODES';
import config from '../../../config'

export type State = {
    mode: DISPLAY_MODES
}

export default reactive<State>({
    mode: config.defaultDisplayMode,
})
