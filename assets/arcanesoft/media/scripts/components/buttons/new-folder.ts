import { defineComponent } from 'vue'
import { useActions } from '../../store'
import { MEDIA_TOOLS } from '../../enums'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-new-folder-button',

    setup() {
        const { openMediaTool } = useActions()

        const onClick = (): void => openMediaTool(MEDIA_TOOLS.NEW_FOLDER)

        return {
            trans,
            onClick,
        };
    },

    template: `
        <button @click.prevent="onClick" type="button"
                class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-folder-plus"></i> {{ trans('New Folder') }}
        </button>
    `,
})
