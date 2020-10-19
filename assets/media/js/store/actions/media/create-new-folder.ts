import api from '../../../api/media'
import { startLoading } from '../loading'

export default (path: string): Promise<any> => {
    startLoading()

    return api.createNewFolder(path)
}
