import { defineComponent, ref } from 'vue'
import mediaTools from '../../store/modules/media-tools'
import config from '../../config'

import CloseToolButton from '../buttons/close-tool'
import DeleteMediaButton from '../buttons/delete-media'
import DisplayModeButton from '../buttons/display-mode'
import MoveMediaButton from '../buttons/move-media'
import NewFolderButton from '../buttons/new-folder'
import OpenFileUploaderButton from '../buttons/open-file-uploader'
import PreviewModeButton from '../buttons/preview-mode'
import RefreshButton from '../buttons/refresh'
import RenameMediaButton from '../buttons/rename-media'

export default defineComponent({
    name: 'v-media-toolbar',

    props: {
        readonly: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        CloseToolButton,
        DeleteMediaButton,
        DisplayModeButton,
        MoveMediaButton,
        NewFolderButton,
        OpenFileUploaderButton,
        PreviewModeButton,
        RefreshButton,
        RenameMediaButton,
    },

    setup() {
        const { hasActive: hasActiveMediaTool } = mediaTools()

        const modes = ref(config.displayModes)

        return {
            modes,
            hasActiveMediaTool,
        }
    },

    template: `
        <div class="media-manager-toolbar d-flex" v-if=" ! hasActiveMediaTool">
            <div v-if=" ! readonly" class="btn-group" role="group">
                <OpenFileUploaderButton/>
                <NewFolderButton/>
            </div>

            <RefreshButton class="ml-1"/>

            <div v-if=" ! readonly" class="btn-group ml-1" role="group">
                <MoveMediaButton/>
                <RenameMediaButton/>
                <DeleteMediaButton/>
            </div>

            <div class="btn-group display-modes ml-auto" role="group" aria-label="Display Mode">
                <DisplayModeButton v-for="mode in modes" :key="mode.key" :mode="mode"/>
            </div>

            <PreviewModeButton v-if=" ! readonly" class="ml-1 d-none d-md-block"/>
        </div>

        <div class="d-flex media-manager-toolbar" v-else>
            <CloseToolButton/>
        </div>
    `,
})
