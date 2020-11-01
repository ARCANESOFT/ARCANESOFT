import { computed, ComputedRef } from 'vue'
import { MediaItem, MediaItems } from '../../../types'
import { MEDIA_TYPES } from '../../../enums'
import state from './state'
import helpers from './helpers'

export type Getters = {
    items: ComputedRef<MediaItems>
    itemsCount: ComputedRef<number>
    directories: ComputedRef<MediaItems>
    directoriesCount: ComputedRef<number>
    files: ComputedRef<MediaItems>
    filesCount: ComputedRef<number>
}

export default (): Getters => {
    const { isMediaType } = helpers()

    const items = computed<MediaItems>(() => state.items)
    const itemsCount = computed<number>(() => state.items.length)

    const filterMediasByType = (type: MEDIA_TYPES): MediaItems => items.value
        .filter((item: MediaItem) => isMediaType(item, type))

    const directories = computed<MediaItems>(() => filterMediasByType(MEDIA_TYPES.DIRECTORY))
    const directoriesCount = computed<number>(() => directories.value.length)

    const files = computed<MediaItems>(() => filterMediasByType(MEDIA_TYPES.FILE))
    const filesCount = computed<number>(() => files.value.length)

    return {
        items,
        itemsCount,
        directories,
        directoriesCount,
        files,
        filesCount,
    }
}
