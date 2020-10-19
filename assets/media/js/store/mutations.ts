import state from './state'
import { DISPLAY_MODES, MEDIA_TOOLS } from '../enums'
import { MediaItem } from '../types'

export default {
    setLoadingState(loading: boolean): void {
        state.loading = loading
    },

    setCurrentLocation(location: string): void {
        state.currentLocation = location
    },

    setMediaItems(items: Array<MediaItem>): void {
        state.mediaItems = items
    },

    setSelectedMediaItems(items: Array<MediaItem>): void {
        state.selectedMediaItem = items
    },

    setDisplayMode(mode: DISPLAY_MODES): void {
        state.displayMode = mode
    },

    setActiveMediaTool(action: MEDIA_TOOLS|null): void {
        state.activeMediaTool = action
    },

    setPreviewMode(enabled: boolean): void {
        state.previewMode = enabled
    },
}
