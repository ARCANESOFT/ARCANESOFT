import { defineComponent } from 'vue'
import useActions from '../../store/actions'
import useGetters from '../../store/getters'

export default defineComponent({
    name: 'v-datatable-reload-button',

    setup() {
        const { reload } = useActions()
        const { isLoading } = useGetters()

        const click = async (): Promise<void> => await reload()

        return {
            isLoading,
            click,
        }
    },

    template: `
        <button @click.prevent="click" class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-sync" :class="{'fa-spin': isLoading}"></i>
        </button>
    `,
})
