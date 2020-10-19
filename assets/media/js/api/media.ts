import config from '../config'
import request from '@arcanesoft/helpers/js/Utilities/Request'
import { MediaItem } from '../types'

export default {
    getItems(location: string): Promise<any> {
        return request().get(`${config.baseUrl}/items`, {
            params: {
                location,
            },
        })
    },

    getDirectories(location: string): Promise<any> {
        return request().get(`${config.baseUrl}/directories`, {
            params: {
                location,
            },
        })
    },

    createNewFolder(path: string): Promise<any> {
        return request().post(`${config.baseUrl}/new-folder`, {
            path,
        })
    },

    moveItem(destination: string, path: string): Promise<any> {
        return request().put(`${config.baseUrl}/move`, {
            destination,
            path,
        })
    },

    renameItem(oldPath: string, newPath: string): Promise<any> {
        return request().put(`${config.baseUrl}/rename`, {
            location,
            'old_path': oldPath,
            'new_path': newPath,
        })
    },

    delete(item: MediaItem): Promise<any> {
        return request().delete(`${config.baseUrl}/delete`, {
            params: {
                path: item.path,
                type: item.type,
            },
        })
    },

    download(item: MediaItem): Promise<any> {
        return request().get(`${config.baseUrl}/download`, {
            responseType: 'blob',
            params: {
                path: item.path,
            },
        })
    },
}
