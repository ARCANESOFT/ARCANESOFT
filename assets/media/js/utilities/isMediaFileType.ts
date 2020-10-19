import { MediaItem } from '../types'
import { MEDIA_TYPES } from '../enums'

export default (media: MediaItem): boolean => media.type === MEDIA_TYPES.FILE

