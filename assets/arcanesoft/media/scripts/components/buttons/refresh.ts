import { defineComponent } from 'vue'
import { useActions, useGetters } from '../../store'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-refresh-button',

    setup() {
        const { isLoading } = useGetters()
        const { loadItems } = useActions()

        const onClick = async (): Promise<void> => await loadItems()

        return {
            trans,
            isLoading,
            onClick,
        };
    },

    template: `
        <button @click.prevent="onClick" type="button"
                :title="trans('Refresh')" :disabled="isLoading"
                class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-sync-alt" :class="{'fa-spin': isLoading}"></i>
        </button>
    `,
})

