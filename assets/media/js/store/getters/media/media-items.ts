import {MediaItem} from '../../../types'
import state from "../../state";

export default (): Array<MediaItem> => state.mediaItems
