import { defineComponent } from 'vue'
import TOOLS from '../../enums/MEDIA_TOOLS'
import mediaTools from '../../store/modules/media-tools'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-open-file-uploader-button',

    setup() {
        const { open: openMediaTool } = mediaTools()

        function openFileUploaderMediaTool(): void {
            openMediaTool(TOOLS.FILE_UPLOADER)
        }

        return {
            trans,
            openFileUploaderMediaTool,
        };
    },

    template: `
        <button @click.prevent="openFileUploaderMediaTool" type="button"
                class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-upload"></i> {{ trans('Upload') }}
        </button>
    `,
})
