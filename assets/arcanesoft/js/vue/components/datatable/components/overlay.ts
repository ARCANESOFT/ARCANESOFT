import { defineComponent } from 'vue'

export default defineComponent({
    name: 'v-dt-card-overlay',

    template: `
        <div class="v-dt-card-overlay">
            <div class="v-dt-card-spinner spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `,
})
