import { defineComponent } from 'vue'
import getters from '../../store/getters'
import Row from './row'

export default defineComponent({
    name: 'v-datatable-rows',

    components: {
        Row,
    },

    setup() {
        const { rows, columns } = getters()

        return {
            rows,
            columns,
        }
    },

    template: `
        <tbody>
            <Row v-for="(row, index) in rows"
                 :key="index"
                 :row="row" :columns="columns"/>
        </tbody>
    `,
})
