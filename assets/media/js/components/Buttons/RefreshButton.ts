import { defineComponent } from 'vue'
import loadMediaItems from '../../store/actions/media/load-media-items'
import translator from '../../mixins/translator'
import isLoading from '../../computed/is-loading'

export default defineComponent({
    name: 'v-media-refresh-button',

    mixins: [
        translator,
    ],

    setup() {
        return {
            isLoading,
            reloadCurrentLocation: (): void => {
                loadMediaItems().then()
            },
        }
    },

    template: `
        <button @click.prevent="reloadCurrentLocation" type="button"
                :title="trans('Refresh [R]')" :disabled="isLoading"
                class="btn btn-light">
            <i class="fas fa-fw fa-sync-alt" :class="{'fa-spin': isLoading}"></i>
        </button>
    `,
})

