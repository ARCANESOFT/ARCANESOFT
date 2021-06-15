import { defineComponent } from 'vue'
import { trans } from '../../../helpers/translator'

export default defineComponent({
    name: 'v-media-item-preview-no-selected',

    setup() {
        return {
            trans,
        };
    },

    template: `
        <div class="item-preview-icon d-flex justify-content-center">
            <i class="fa fa-fw fa-5x fa-info-circle"></i>
        </div>
        <p class="p-2">
            <small>{{ trans('No selected item !') }}</small>
        </p>
    `,
})
