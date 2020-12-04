import { defineComponent, ref } from 'vue'
import { useActions } from '../store'
import useTranslator from '../../../../mixins/translator'
import debounce from '@arcanesoft/core/src/functions/debounce'

export default defineComponent({
    name: 'v-search-input',

    setup() {
        const { searchQuery } = useActions()
        const { trans } = useTranslator()

        // Refs
        const query = ref<string>('')
        const oldQuery = ref<string>('')

        // Methods
        const onInput = debounce(async () => {
            if (query.value !== oldQuery.value) {
                await searchQuery(query.value)
                oldQuery.value = query.value
            }
        }, 800)

        return {
            query,
            onInput,
            trans,
        }
    },

    template: `
        <input v-model="query" @input="onInput"
               type="search" class="v-dt-search-input"
               :placeholder="trans('Search...')">
    `,
})
