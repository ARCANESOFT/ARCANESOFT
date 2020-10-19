import api from '../../../api/media'
import startLoading from '../loading/start-loading'

export default (oldPath: string, newPath: string): Promise<any> => {
    startLoading()

    return api.renameItem(oldPath, newPath)
}
