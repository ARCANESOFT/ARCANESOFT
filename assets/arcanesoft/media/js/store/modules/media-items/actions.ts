import { MediaItem } from '../../../types'
import api from '../../api/media'
import mutations from './mutations'
import location from '../location'
import selectedMediaItems from '../selected-media-items'

export type Actions = {
    loadItems(loc?: string): Promise<any>
    deleteItem(item: MediaItem): Promise<any>
    renameItem(from: string, to: string): Promise<any>
    moveItem(from: string, to: string): Promise<any>
    downloadItem(item: MediaItem): Promise<any>
    createNewFolder(path: string): Promise<any>
}

export default (): Actions => {
    const mediaApi = api()
    const { current: currentLocation } = location()
    const { clear: clearSelectedMediaItems } = selectedMediaItems()
    const { setItems } = mutations()

    const loadItems = (loc?: string): Promise<any> => {
        clearSelectedMediaItems()

        return mediaApi.getItems(loc || currentLocation.value).then(({data}) => {
            setItems(data)
        })
    }

    const deleteItem = (item: MediaItem): Promise<any> => mediaApi.deleteItem(item)

    const renameItem = (from: string, to: string): Promise<any> => mediaApi.renameItem(from, to)

    const moveItem = (from: string, to: string): Promise<any> => mediaApi.moveItem(from, to)

    const downloadItem = (item: MediaItem): Promise<any> => mediaApi.downloadItem(item)

    const createNewFolder = (path: string): Promise<any> => mediaApi.createNewFolder(path)

    return {
        loadItems,
        deleteItem,
        renameItem,
        moveItem,
        downloadItem,
        createNewFolder,
    }
}
