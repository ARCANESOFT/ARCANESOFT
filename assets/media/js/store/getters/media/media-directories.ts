import { MEDIA_TYPES } from '../../../enums'
import { MediaItem } from '../../../types'
import mediaItems from './media-items'

export default (): Array<MediaItem> => mediaItems()
    .filter((item: MediaItem) => item.type === MEDIA_TYPES.DIRECTORY)
