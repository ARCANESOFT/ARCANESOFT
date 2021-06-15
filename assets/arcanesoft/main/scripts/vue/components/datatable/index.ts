import { defineComponent } from 'vue'

import Datatable from './datatable'
import { provideState } from './store/state'

export default defineComponent({
    name: 'v-datatable',

    props: {
        name: {
            type: String,
            default: 'datatable',
        },

        url: {
            type: String,
            required: true,
        },
    },

    components: {
        Datatable,
    },

    setup() {
        provideState()

        return {
            //
        }
    },

    template: `
        <div class="v-dt-container">
            <Datatable :name="name" :url="url"/>
        </div>
    `,
})
