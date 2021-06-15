import { defineComponent } from 'vue'
import { useActions } from '../../store'
import TOOLS from '../../enums/MEDIA_TOOLS'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-open-file-uploader-button',

    setup() {
        const { openMediaTool } = useActions()

        const onClick = (): void => openMediaTool(TOOLS.FILE_UPLOADER)

        return {
            trans,
            onClick,
        };
    },

    template: `
        <button @click.prevent="onClick" type="button"
                class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-upload"></i> {{ trans('Upload') }}
        </button>
    `,
})
