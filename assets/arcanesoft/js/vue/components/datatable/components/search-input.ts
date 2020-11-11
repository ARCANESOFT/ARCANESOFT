import { defineComponent, ref } from 'vue'
import debounce from '@arcanesoft/core/src/functions/debounce'
import useActions from '../store/actions'

export default defineComponent({
    name: 'v-search-input',

    setup() {
        const { searchQuery } = useActions()

        const query = ref<string>('')
        const oldQuery = ref<string>('')

        const search = debounce(async () => {
            if (query.value !== oldQuery.value) {
                await searchQuery(query.value)
                oldQuery.value = query.value
            }
        }, 800)

        return {
            query,
            search,
        }
    },

    template: `
        <input v-model="query" @input="search"
               type="search" class="v-datatable-search-input" placeholder="Search...">
    `,
})
