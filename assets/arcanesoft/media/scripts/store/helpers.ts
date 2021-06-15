import { computed, ComputedRef } from 'vue'
import useGetters from './getters'
import { MediaItem } from '../types'
import { MEDIA_TYPES, DISPLAY_MODES } from '../enums'

export default () => {
    const { currentLocation, selectedItems, isRootLocation, selectedDisplayMode } = useGetters()

    const isMediaItemSelected = (item: MediaItem): boolean => selectedItems.value
        .filter((selected: MediaItem) => selected.path === item.path)
        .length > 0

    const isMediaType = (media: MediaItem, type: MEDIA_TYPES): boolean => media.type === type
    const isMediaDirectory = (media: MediaItem): boolean => isMediaType(media, MEDIA_TYPES.DIRECTORY)
    const isMediaFile = (media: MediaItem): boolean => isMediaType(media, MEDIA_TYPES.FILE)

    const isDisplayModeSelected = (mode: DISPLAY_MODES): ComputedRef<boolean> => computed<boolean>(() => selectedDisplayMode.value === mode)

    const normalizeLocation = (path: string): string => isRootLocation.value ? path : `${currentLocation.value}/${path}`

    return {
        isMediaItemSelected,
        isMediaDirectory,
        isMediaFile,
        isMediaType,
        isDisplayModeSelected,
        normalizeLocation,
    }
}
