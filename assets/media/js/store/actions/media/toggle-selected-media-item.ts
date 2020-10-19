import mutations from '../../mutations'
import selectedItems from '../../getters/media/selected-media-items'
import isSelectedMediaItem from '../../getters/media/is-selected-media-item'
import { MediaItem } from '../../../types'

export default (item: MediaItem): void => {
    let items = selectedItems();

    if (items.length > 0 && isSelectedMediaItem(item))
        items = items.filter((selected) => selected.path !== item.path)
    else
        items.push(item)

    mutations.setSelectedMediaItems(items)
}
