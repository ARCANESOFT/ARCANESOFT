import { defineComponent } from 'vue'
import CardOverlay from './card-overlay'

export default defineComponent({
    name: 'v-card',

    props: {
        loading: {
            type: Boolean,
            default: false,
        }
    },

    components: {
        CardOverlay,
    },

    setup() {
        return {
            //
        }
    },

    template: `
        <div class="v-card" :class="{'v-card-loading': loading}">
            <CardOverlay v-if="loading"/>

            <div class="v-card-header">
                <slot name="header"></slot>
            </div>

            <slot name="body"></slot>

            <div class="v-card-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    `,
})
