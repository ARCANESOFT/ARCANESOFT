import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import mutations from '../../store/mutations'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-media-open-file-uploader-button',

    mixins: [
        translator,
    ],

    setup() {
        return {
            open: (): void => mutations.setActiveMediaTool(MEDIA_TOOLS.FILE_UPLOADER),
        }
    },

    template: `
        <button @click.prevent="open" type="button"
                class="btn btn-light">
            <i class="fas fa-fw fa-upload"></i> {{ trans('Upload') }}
        </button>
    `,
})
