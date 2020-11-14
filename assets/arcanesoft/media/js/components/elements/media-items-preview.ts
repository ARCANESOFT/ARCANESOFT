import { defineComponent, computed } from 'vue'
import selectedMediaItems from '../../store/modules/selected-media-items'

import PreviewMultipleMediaItems from './media-item-previews/multiple'
import PreviewNoSelectedMediaItem from './media-item-previews/no-selected'
import PreviewSingleMediaItem from './media-item-previews/single'

export default defineComponent({
    name: 'v-media-item-preview',

    components: {
        PreviewNoSelectedMediaItem,
        PreviewSingleMediaItem,
        PreviewMultipleMediaItems,
    },

    setup() {
        const { items: selectedItems, count } = selectedMediaItems()

        const isSingle = computed<boolean>(() => count.value === 1)
        const isMultiple = computed<boolean>(() => count.value > 1)

        return {
            selectedItems,
            isSingle,
            isMultiple,
        }
    },

    template: `
        <div class="media-item-preview d-none d-md-block p-2">
            <PreviewMultipleMediaItems v-if="isMultiple" :items="selectedItems"/>
            <PreviewSingleMediaItem v-else-if="isSingle" :item="selectedItems[0] || null"/>
            <PreviewNoSelectedMediaItem v-else/>
        </div>
    `
})


