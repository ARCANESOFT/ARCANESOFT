import { defineComponent } from 'vue'
import loading from '../../store/modules/loading'
import mediaItems from '../../store/modules/media-items'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-refresh-button',

    setup() {
        const { isLoading, handleLoading } = loading()
        const { loadItems } = mediaItems()

        const refresh = (): Promise<void> => handleLoading(async () => await loadItems())

        return {
            trans,
            isLoading,
            refresh,
        };
    },

    template: `
        <button @click.prevent="refresh" type="button"
                :title="trans('Refresh [R]')" :disabled="isLoading"
                class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-sync-alt" :class="{'fa-spin': isLoading}"></i>
        </button>
    `,
})

