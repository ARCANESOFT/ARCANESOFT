import { MediaItem } from '../../../types'
import { MEDIA_TYPES } from '../../../enums'

export type Helpers = {
    isMediaDirectory(media: MediaItem): boolean
    isMediaFile(media: MediaItem): boolean
    isMediaType(media: MediaItem, type: MEDIA_TYPES): boolean
}

export default (): Helpers => {
    const isMediaType = (media: MediaItem, type: MEDIA_TYPES): boolean => media.type === type
    const isMediaDirectory = (media: MediaItem): boolean => isMediaType(media, MEDIA_TYPES.DIRECTORY)
    const isMediaFile = (media: MediaItem):boolean => isMediaType(media, MEDIA_TYPES.FILE)

    return {
        isMediaDirectory,
        isMediaFile,
        isMediaType,
    }
}
