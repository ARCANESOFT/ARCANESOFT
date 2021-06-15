import { defineComponent } from 'vue'
import { useActions, useGetters } from '../../store'
import { MediaItem } from '../../types'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-delete-item',

    setup() {
        const { deleteItem, loadItems, closeMediaTool } = useActions()
        const { isLoading, selectedItems } = useGetters()

        const onClick = async (): Promise<void> => {
            const requests = selectedItems.value.map((item: MediaItem) => deleteItem(item));

            await Promise.all(requests).then(() => {
                loadItems().then(() => { closeMediaTool() })
            })
        }

        return {
            trans,
            isLoading,
            selectedItems,
            onClick,
        }
    },

    template: `
        <div class="p-3 bg-white">
            <h3>{{ trans('Delete') }}</h3>

            <ul class="pl-3 mb-0">
                <li v-for="item in selectedItems" :key="item.path">{{ item.name }}</li>
            </ul>

            <div class="text-right">
                <button @click.prevent="onClick" type="button" :disabled="isLoading"
                        class="btn btn-danger">
                    <i class="far fa-fw fa-trash-alt"></i> {{ trans(isLoading ? 'Loading...' : 'Delete') }}
                </button>
            </div>
        </div>
    `,
})

