import { defineComponent } from 'vue'
import useGetters from '../../store/getters'
import Row from './row'

export default defineComponent({
    name: 'v-datatable-rows',

    components: {
        Row,
    },

    setup() {
        const { rows } = useGetters()

        return {
            rows,
        }
    },

    template: `
        <tbody>
            <Row v-for="row in rows" :row="row"/>
        </tbody>
    `,
})
