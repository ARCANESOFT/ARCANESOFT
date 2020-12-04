import { useState } from './state'
import useGetters from './getters'
import useHelpers from './helpers'
import { MediaItem, MediaItems } from '../types'
import { MEDIA_TOOLS, DISPLAY_MODES } from '../enums'

export type Mutations = {
    startLoading:           () => void
    stopLoading:            () => void
    setCurrentLocation:     (location: string) => void
    setItems:               (items: MediaItems) => void
    setSelectedItems:       (items: MediaItems) => void
    clearSelectedItems:     () => void
    toggleSelectedItem:     (item: MediaItem) => void
    setMediaTool:           (tool: MEDIA_TOOLS | null) => void
    setSelectedDisplayMode: (displayMode: DISPLAY_MODES) => void
    setPreviewMode:         (shown: boolean) => void
}

export default (): Mutations => {
    const state = useState()
    const { isNotEmpty } = useGetters()
    const { isMediaItemSelected } = useHelpers()

    const startLoading = (): void => {
        setLoading(true)
    }

    const stopLoading = (): void => {
        setLoading(false)
    }

    const setLoading = (loading: boolean): void => {
        if (state.loading !== loading)
            state.loading = loading
    }

    const setCurrentLocation = (location: string): void => {
        state.location = location
    }

    const setItems = (items: MediaItems): void => {
        state.items = items
    }

    const setSelectedItems = (selectedItems: MediaItems) => {
        state.selectedItems = selectedItems
    }

    const clearSelectedItems = () => {
        setSelectedItems([])
    }

    const toggleSelectedItem = (item: MediaItem): void => {
        let selected = state.selectedItems

        if (isNotEmpty.value && isMediaItemSelected(item))
            selected = selected.filter((selected: MediaItem) => selected.path !== item.path)
        else
            selected.push(item)

        setSelectedItems(selected)
    }

    const setMediaTool = (tool: MEDIA_TOOLS | null): void => {
        state.tool = tool
    }

    const setSelectedDisplayMode = (displayMode: DISPLAY_MODES): void => {
        state.displayMode = displayMode
    }

    const setPreviewMode = (shown: boolean): void => {
        state.previewMode = shown
    }

    return {
        startLoading,
        stopLoading,
        setCurrentLocation,
        setItems,
        setSelectedItems,
        clearSelectedItems,
        toggleSelectedItem,
        setMediaTool,
        setSelectedDisplayMode,
        setPreviewMode,
    }
}
