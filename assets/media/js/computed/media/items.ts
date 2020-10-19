import { computed } from 'vue'
import { MediaItem } from '../../types'
import mediaItems from '../../store/getters/media/media-items'

export default computed((): Array<MediaItem> => mediaItems())
