import api from '../../../api/media'

export default (destination: string, path: string): Promise<any> => api.moveItem(destination, path)
