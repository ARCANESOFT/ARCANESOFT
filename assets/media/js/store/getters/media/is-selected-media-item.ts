import selectedItems from './selected-media-items'
import { MediaItem } from '../../../types'

export default (item: MediaItem): boolean => selectedItems()
    .filter((selected) => selected.path === item.path)
    .length > 0
