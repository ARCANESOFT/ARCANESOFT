import { defineComponent } from 'vue'
import { MediaItem } from '../../types'
import loading from '../../store/modules/loading'
import mediaTools from '../../store/modules/media-tools'
import mediaItems from '../../store/modules/media-items'
import selectedMediaItems from '../../store/modules/selected-media-items'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-delete-item',

    setup() {
        const { isLoading, handleLoading } = loading()
        const { close: closeMediaTool } = mediaTools()
        const { loadItems: loadMediaItems, deleteItem: deleteMediaItem } = mediaItems()
        const { items: selectedItems } = selectedMediaItems()

        const deleteItems = (): Promise<void> => handleLoading(async (): Promise<void> => {
            const requests = selectedItems.value.map((item: MediaItem) => deleteMediaItem(item));

            await Promise.all(requests).then(() => {
                loadMediaItems().then(() => {
                    closeMediaTool()
                })
            })
        })

        return {
            trans,
            isLoading,
            selectedItems,
            deleteItems,
        }
    },

    template: `
        <div class="p-3 bg-white">
            <h3>{{ trans('Delete') }}</h3>

            <ul class="pl-3 mb-0">
                <li v-for="item in selectedItems" :key="item.path">{{ item.name }}</li>
            </ul>

            <div class="text-right">
                <button @click.prevent="deleteItems" type="button" :disabled="isLoading"
                        class="btn btn-danger">
                    <i class="far fa-fw fa-trash-alt"></i> {{ trans(isLoading ? 'Loading...' : 'Delete') }}
                </button>
            </div>
        </div>
    `,
})

