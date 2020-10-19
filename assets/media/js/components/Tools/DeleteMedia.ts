import { defineComponent } from 'vue'
import { MediaItem } from '../../types'
import closeActiveMediaTool from '../../store/actions/tools/close-active-media-tool'
import deleteMediaItem from '../../store/actions/media/delete-media-item'
import loadMediaItems from '../../store/actions/media/load-media-items'
import isLoading from '../../computed/is-loading'
import selectedMediaItems from '../../computed/media/selected-items'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-media-delete-item',

    mixins: [
        translator,
    ],

    setup() {
        function deleteSelectedItems(): void {
            let requests = selectedMediaItems.value.map((item: MediaItem) => deleteMediaItem(item));

            Promise.all(requests).then(() => {
                loadMediaItems().then(() => {
                    closeActiveMediaTool()
                })
            })
        }

        return {
            isLoading,
            selectedMediaItems,
            deleteSelectedItems,
        }
    },

    template: `
        <div class="p-3 bg-white">
            <h3>{{ trans('Delete') }}</h3>

            <ul class="pl-3 mb-0">
                <li v-for="item in selectedMediaItems" :key="item.path">{{ item.name }}</li>
            </ul>

            <div class="text-right">
                <button @click.prevent="deleteSelectedItems" type="button" :disabled="isLoading"
                        class="btn btn-danger">
                    <i class="far fa-fw fa-trash-alt"></i> {{ trans(isLoading ? 'Loading...' : 'Delete') }}
                </button>
            </div>
        </div>
    `,
})

