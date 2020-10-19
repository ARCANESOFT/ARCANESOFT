import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import mutations from '../../store/mutations'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-media-new-folder-button',

    mixins: [
        translator,
    ],

    setup() {
        return {
            newFolder: (): void => mutations.setActiveMediaTool(MEDIA_TOOLS.NEW_FOLDER),
        }
    },

    template: `
        <button @click.prevent="newFolder" type="button"
                class="btn btn-light">
            <i class="fas fa-fw fa-folder-plus"></i> {{ trans('New Folder') }}
        </button>
    `,
})
