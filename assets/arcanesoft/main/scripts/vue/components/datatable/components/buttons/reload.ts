import { defineComponent } from 'vue'
import { useActions, useGetters } from '../../store'
import useTranslator from '../../../../../mixins/translator'

export default defineComponent({
    name: 'v-datatable-reload-button',

    setup() {
        const { reload } = useActions()
        const { isLoading } = useGetters()
        const { trans } = useTranslator()

        const click = async (): Promise<void> => await reload()

        return {
            isLoading,
            click,
            trans,
        }
    },

    template: `
        <button @click.prevent="click" class="v-dt-toolbar-button v-dt-reload-button"
                :aria-label="trans('Reload')">
            <i class="fas fa-fw fa-sync" :class="{'fa-spin': isLoading}"></i>
        </button>
    `,
})
