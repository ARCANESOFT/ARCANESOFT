import { defineComponent } from 'vue'
import translator from '../../../mixins/translator'

export default defineComponent({
    name: 'v-media-preview-no-selected',

    mixins: [
        translator,
    ],

    template: `
        <div class="item-preview-icon d-flex justify-content-center">
            <i class="fa fa-fw fa-5x fa-info-circle"></i>
        </div>
        <p class="p-2">
            <small>{{ trans('No selected item !') }}</small>
        </p>
    `,
})
