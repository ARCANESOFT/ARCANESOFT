import api from '../../../api/media'
import { MediaItem } from '../../../types'

export default (item: MediaItem): Promise<any> => api.download(item)
