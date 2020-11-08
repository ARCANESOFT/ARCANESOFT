import { defineComponent } from 'vue'
import useStore from '../../store'
import Column from './column'

export default defineComponent({
    name: 'v-datatable-columns',

    components: {
        Column,
    },

    setup() {
        const { columns } = useStore()

        return {
            columns,
        }
    },

    template: `
        <thead>
            <tr class="v-datatable-columns">
                <Column v-for="column in columns" :key="column.key" :column="column"/>
            </tr>
        </thead>
    `,
})
