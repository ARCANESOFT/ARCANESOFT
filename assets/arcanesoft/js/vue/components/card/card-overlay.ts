import { defineComponent } from 'vue'

export default defineComponent({
    name: 'v-card-overlay',

    template: `
        <div v-if="isLoading" class="v-datatable-card-overlay">
            <div class="v-card-spinner spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `,
})
