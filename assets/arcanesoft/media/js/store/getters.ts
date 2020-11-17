import { computed, ComputedRef } from 'vue'
import { useState } from './state'
import { DISPLAY_MODES, MEDIA_TOOLS, MEDIA_TYPES } from '../enums'
import { MediaItem, MediaItems } from '../types'

export type Getters = {
    isLoading:           ComputedRef<boolean>
    currentLocation:     ComputedRef<string>
    isRootLocation:      ComputedRef<boolean>
    activeMediaTool:     ComputedRef<MEDIA_TOOLS | null>
    hasActiveMediaTool:  ComputedRef<boolean>
    isPreviewModeShown:  ComputedRef<boolean>
    items:               ComputedRef<MediaItems>
    itemsCount:          ComputedRef<number>
    directories:         ComputedRef<MediaItems>
    directoriesCount:    ComputedRef<number>
    files:               ComputedRef<MediaItems>
    filesCount:          ComputedRef<number>
    isEmpty:             ComputedRef<boolean>
    isNotEmpty:          ComputedRef<boolean>
    selectedItems:       ComputedRef<MediaItems>
    selectedItemsCount:  ComputedRef<number>
    hasSelectedItems:    ComputedRef<boolean>
    selectedDisplayMode: ComputedRef<DISPLAY_MODES>
}

export default (): Getters => {
    const state = useState()

    const isLoading = computed<boolean>(() => state.loading)
    const isPreviewModeShown = computed<boolean>(() => state.previewMode)

    const currentLocation = computed<string>(() => state.location)
    const isRootLocation = computed<boolean>(() => state.location === '/')

    const activeMediaTool = computed<MEDIA_TOOLS | null>(() => state.tool)
    const hasActiveMediaTool = computed<boolean>(() => state.tool !== null && Object.values(MEDIA_TOOLS).includes(state.tool))

    const items = computed<MediaItems>(() => state.items)
    const itemsCount = computed<number>(() => state.items.length)

    const filterMediasByType = (type: MEDIA_TYPES): MediaItems => items.value
        .filter((item: MediaItem): boolean => item.type === type)

    const directories = computed<MediaItems>(() => filterMediasByType(MEDIA_TYPES.DIRECTORY))
    const directoriesCount = computed<number>(() => directories.value.length)

    const files = computed<MediaItems>(() => filterMediasByType(MEDIA_TYPES.FILE))
    const filesCount = computed<number>(() => files.value.length)

    const selectedItems = computed<MediaItems>(() => state.selectedItems)
    const selectedItemsCount = computed<number>(() => state.selectedItems.length)
    const hasSelectedItems = computed<boolean>(() => selectedItemsCount.value > 0)

    const isNotEmpty = computed<boolean>(() => itemsCount.value > 0)
    const isEmpty = computed<boolean>(() => ! isNotEmpty.value)

    const selectedDisplayMode = computed<DISPLAY_MODES>(() => state.displayMode)

    return {
        isLoading,
        currentLocation,
        isRootLocation,
        activeMediaTool,
        hasActiveMediaTool,
        isPreviewModeShown,
        items,
        itemsCount,
        directories,
        directoriesCount,
        files,
        filesCount,
        isEmpty,
        isNotEmpty,
        selectedItems,
        selectedItemsCount,
        hasSelectedItems,
        selectedDisplayMode,
    }
}
