import api from '../../../api/media'
import startLoading from '../loading/start-loading'
import { MediaItem } from '../../../types'

export default (item: MediaItem): Promise<any> => {
    startLoading()

    return api.delete(item)
}
