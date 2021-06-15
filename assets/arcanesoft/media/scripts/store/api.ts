import arcanesoft from '@arcanesoft/core/src/helpers/arcanesoft'
import config from '../config'
import { MediaItem } from '../types'

const request = () => arcanesoft().request({
    baseURL: config.baseUrl,
})

export default {
    getItems: (location: string): Promise<any> => request().get(`/items`, {
        params: {
            location,
        },
    }),

    getDirectories: (location: string): Promise<any> => request().get(`/directories`, {
        params: {
            location,
        },
    }),

    createNewFolder: (path: string): Promise<void> => request().post(`/new-folder`, {
        path,
    }),

    moveItem: (path: string, destination: string): Promise<any> => request().put(`/move`, {
        destination,
        path,
    }),

    renameItem: (from: string, to: string): Promise<any> => request().put(`/rename`, {
        location,
        'old_path': from,
        'new_path': to,
    }),

    deleteItem: (item: MediaItem): Promise<any> => request().delete(`/delete`, {
        params: {
            path: item.path,
            type: item.type,
        },
    }),

    downloadItem: (item: MediaItem): Promise<any> => request().get(`/download`, {
        responseType: 'blob',
        params: {
            path: item.path,
        },
    }),
}
