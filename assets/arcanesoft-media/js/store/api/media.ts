import { MediaItem } from '../../types'
import config from '../../config'
import arcanesoft from '@arcanesoft/core/src/helpers/arcanesoft'

export type Api = {
    getItems(location: string): Promise<any>
    getDirectories(location: string): Promise<any>
    createNewFolder(path: string): Promise<any>
    moveItem(destination: string, path: string): Promise<any>
    renameItem(from: string, to: string): Promise<any>
    deleteItem(item: MediaItem): Promise<any>,
    downloadItem(item: MediaItem): Promise<any>,
}

const request = () => arcanesoft().request({
    baseURL: config.baseUrl,
})

export default (): Api => {
    const getItems = (location: string): Promise<any> => request().get(`/items`, {
        params: {
            location,
        },
    })

    const getDirectories = (location: string): Promise<any> => request().get(`/directories`, {
        params: {
            location,
        },
    })

    const createNewFolder = (path: string): Promise<any> => request().post(`/new-folder`, {
        path,
    })

    const moveItem = (destination: string, path: string): Promise<any> => request().put(`/move`, {
        destination,
        path,
    })

    const renameItem = (from: string, to: string): Promise<any> => request().put(`/rename`, {
        location,
        'old_path': from,
        'new_path': to,
    })

    const deleteItem = (item: MediaItem): Promise<any> => request().delete(`/delete`, {
        params: {
            path: item.path,
            type: item.type,
        },
    })

    const downloadItem = (item: MediaItem): Promise<any> => request().get(`/download`, {
        responseType: 'blob',
        params: {
            path: item.path,
        },
    })

    return {
        getItems,
        getDirectories,
        createNewFolder,
        moveItem,
        renameItem,
        deleteItem,
        downloadItem,
    }
}
