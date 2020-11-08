import { defineComponent } from 'vue'
import useStore from '../../store'

export default defineComponent({
    name: 'v-datatable-reload-button',

    setup() {
        const { reload, isLoading } = useStore()

        const click = async () => await reload()

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
