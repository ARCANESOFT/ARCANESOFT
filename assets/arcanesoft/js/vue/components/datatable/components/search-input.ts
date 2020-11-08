import { defineComponent, ref } from 'vue'
import useStore from '../store'

export default defineComponent({
    name: 'v-search-input',

    setup() {
        const { searchQuery } = useStore()

        const query = ref<string>('')
        const oldQuery = ref<string>('')

        const search = async (): Promise<void> => {
            if (query.value !== oldQuery.value) {
                await searchQuery(query.value)

                oldQuery.value = query.value
            }
        }

        return {
            query,
            search,
        }
    },

    template: `
        <input v-model="query" @keyup.enter="search" @blur="search"
               type="search" class="v-datatable-search-input" placeholder="Search...">
    `,
})
