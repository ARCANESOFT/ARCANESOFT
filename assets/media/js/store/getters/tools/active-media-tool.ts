import { MEDIA_TOOLS } from '../../../enums'
import state from '../../state'

export default (): MEDIA_TOOLS | null => state.activeMediaTool
