import { defineComponent } from 'vue'

export default defineComponent({
    name: 'v-datatable-card-overlay',

    template: `
        <div class="v-datatable-card-overlay">
            <div class="v-datatable-card-spinner spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `,
})
