import api from '../../../api/media'
import mutations from '../../mutations'
import currentLocation from '../../getters/location/current-location'
import { startLoading, stopLoading } from '../loading'
import clearSelectedMediaItems from './clear-selected-media-items'

export default (location = null): Promise<any> => {
    startLoading()
    clearSelectedMediaItems()

    return api
        .getItems(location || currentLocation())
        .then((response) => {
            mutations.setMediaItems(response.data)
            stopLoading()
        })
}
