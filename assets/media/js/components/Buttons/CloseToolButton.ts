import { defineComponent } from 'vue'
import closeActiveMediaTool from '../../store/actions/tools/close-active-media-tool'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-media-close-button',

    mixins: [
        translator,
    ],

    template: `
        <button @click.prevent="closeActiveMediaTool()" type="button"
                class="btn btn-secondary">
            <i class="fas fa-fw fa-times"></i> {{ trans('Close') }}
        </button>
    `,
})
