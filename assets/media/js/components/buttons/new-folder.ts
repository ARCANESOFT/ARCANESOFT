import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import mediaTools from '../../store/modules/media-tools'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-new-folder-button',

    setup() {
        const { open: openMediaTool } = mediaTools()

        function openNewFolderMediaTool(): void {
            openMediaTool(MEDIA_TOOLS.NEW_FOLDER)
        }

        return {
            trans,
            openNewFolderMediaTool,
        };
    },

    template: `
        <button @click.prevent="openNewFolderMediaTool" type="button"
                class="btn btn-outline-secondary">
            <i class="fas fa-fw fa-folder-plus"></i> {{ trans('New Folder') }}
        </button>
    `,
})
