import { computed } from 'vue'
import selectedMediaItems from '../../store/getters/media/selected-media-items'
import { MediaItem } from '../../types'

export default computed((): Array<MediaItem> => selectedMediaItems())
