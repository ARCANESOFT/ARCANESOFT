import api from './api'
import useGetters from './getters'
import useMutations from './mutations'
import { MediaItem } from '../types'
import { MEDIA_TOOLS } from '../enums'

export type Actions = {
    loadItems:             (location?: string) => Promise<void>
    changeCurrentLocation: (location?: string) => Promise<void>
    deleteItem:            (item: MediaItem) => Promise<void>
    renameItem:            (from: string, to: string) => Promise<any>
    moveItem:              (from: string, to: string) => Promise<any>
    downloadItem:          (item: MediaItem) => Promise<any>
    createNewFolder:       (path: string) => Promise<any>
    openMediaTool:         (tool: MEDIA_TOOLS) => void
    closeMediaTool:        () => void
    togglePreviewMode:     () => void
}

export default (): Actions => {
    const { currentLocation, isPreviewModeShown } = useGetters()
    const { clearSelectedItems, setItems, setCurrentLocation, stopLoading, startLoading, setMediaTool, setPreviewMode } = useMutations()

    const loadItems = async (location?: string): Promise<void> => {
        startLoading()
        clearSelectedItems()

        const { data } = await api.getItems(location || currentLocation.value)

        setItems(data)
        stopLoading()
    }

    const changeCurrentLocation = async (location: string): Promise<void> => {
        clearSelectedItems()
        setCurrentLocation(location)

        await loadItems(location)
    }

    const deleteItem = async (item: MediaItem): Promise<void> => {
        startLoading()

        await api.deleteItem(item)

        stopLoading()
    }

    const renameItem = async (from: string, to: string): Promise<any> => {
        return await api.renameItem(from, to)
    }

    const moveItem = async (from: string, to: string): Promise<void> => {
        startLoading()

        await api.moveItem(from, to)

        stopLoading()
    }

    const downloadItem = async (item: MediaItem): Promise<any> => {
        return await api.downloadItem(item)
    }

    const createNewFolder = (path: string): Promise<void> => {
        startLoading()

        return api.createNewFolder(path).finally(() => {
            stopLoading()
        })
    }

    const openMediaTool = (tool: MEDIA_TOOLS): void => setMediaTool(tool)
    const closeMediaTool = (): void => setMediaTool(null)

    const togglePreviewMode = (): void => setPreviewMode( ! isPreviewModeShown.value)

    return {
        loadItems,
        changeCurrentLocation,
        deleteItem,
        renameItem,
        moveItem,
        downloadItem,
        createNewFolder,
        openMediaTool,
        closeMediaTool,
        togglePreviewMode,
    }
}
