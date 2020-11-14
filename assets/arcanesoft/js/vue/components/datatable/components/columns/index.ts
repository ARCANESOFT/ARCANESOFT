import { defineComponent } from 'vue'
import useGetters from '../../store/getters'
import Column from './column'

export default defineComponent({
    name: 'v-dt-columns',

    components: {
        Column,
    },

    setup() {
        const { columns } = useGetters()

        return {
            columns,
        }
    },

    template: `
        <thead>
            <tr class="v-dt-columns">
                <Column v-for="column in columns" :key="column.key" :column="column"/>
            </tr>
        </thead>
    `,
})
