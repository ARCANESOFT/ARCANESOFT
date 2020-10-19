import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import activeMediaTool from '../../computed/tools/active-media-tool'
import hasActiveMediaTool from '../../computed/tools/has-active-media-tool'

import {
    NewFolder,
    MediaFilesUploader,
    MoveMedia,
    RenameMedia,
    DeleteMedia,
} from '../Tools'

export default defineComponent({
    name: 'v-media-items-tools',

    components: {
        NewFolder,
        MediaFilesUploader,
        MoveMedia,
        RenameMedia,
        DeleteMedia,
    },

    setup() {
        return {
            hasActiveMediaTool,

            isToolSelected: (tool: MEDIA_TOOLS): boolean => activeMediaTool.value === tool
        }
    },

    template: `
        <div v-if="hasActiveMediaTool">
            <MediaFilesUploader
                v-if="isToolSelected(MEDIA_TOOLS.FILE_UPLOADER)"/>

            <NewFolder
                v-if="isToolSelected(MEDIA_TOOLS.NEW_FOLDER)"/>

            <MoveMedia
                v-if="isToolSelected(MEDIA_TOOLS.MOVE_MEDIA)"/>

            <RenameMedia
                v-if="isToolSelected(MEDIA_TOOLS.RENAME_MEDIA)"/>

            <DeleteMedia
                v-if="isToolSelected(MEDIA_TOOLS.DELETE_MEDIA)"/>
        </div>
    `,
})
