import { defineComponent, computed } from 'vue'
import selectedItems from '../../computed/media/selected-items'
import selectedItemsCount from '../../computed/media/selected-items-count'

import {
    MultipleMediaItems as PreviewMultipleMediaItems,
    NoSelectedMediaItem as PreviewNoSelectedMediaItem,
    SingleMediaItem as PreviewSingleMediaItem,
} from './MediaItemPreviews'


export default defineComponent({
    name: 'v-media-item-preview',

    components: {
        PreviewNoSelectedMediaItem,
        PreviewSingleMediaItem,
        PreviewMultipleMediaItems,
    },

    setup() {
        return {
            selectedItems,
            isSingle: computed((): boolean => selectedItemsCount.value === 1),
            isMultiple: computed((): boolean => selectedItemsCount.value > 1),
        }
    },

    template: `
        <div class="media-item-preview d-none d-md-block">
            <PreviewMultipleMediaItems v-if="isMultiple" :items="selectedItems"/>
            <PreviewSingleMediaItem v-else-if="isSingle" :item="selectedItems[0] || null"/>
            <PreviewNoSelectedMediaItem v-else/>
        </div>
    `
})


