import state from '../../state'
import { DISPLAY_MODES } from '../../../enums'

export default (): DISPLAY_MODES => state.displayMode
