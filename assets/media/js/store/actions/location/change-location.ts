import mutations from '../../mutations'
import loadMediaItems from '../../actions/media/load-media-items'

export default (location: string): Promise<any> => {
    mutations.setCurrentLocation(location)

    return loadMediaItems(location)
}
