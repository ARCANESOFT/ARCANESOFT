import { defineComponent } from 'vue'
import mediaTools from '../../store/modules/media-tools'
import MediaTool from '../../enums/MEDIA_TOOLS'

import DeleteMedia from '../tools/delete-media'
import NewFolder from '../tools/new-folder'
import MediaFilesUploader from '../tools/media-files-uploader'
import MoveMedia from '../tools/move-media'
import RenameMedia from '../tools/rename-media'

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
        const { isSelected: isToolSelected } = mediaTools()

        return {
            isFileUploaderToolSelected: isToolSelected(MediaTool.FILE_UPLOADER),
            isNewFolderToolSelected:    isToolSelected(MediaTool.NEW_FOLDER),
            isMoveMediaToolSelected:    isToolSelected(MediaTool.MOVE_MEDIA),
            isRenameMediaToolSelected:  isToolSelected(MediaTool.MOVE_MEDIA),
            isDeleteMediaToolSelected:  isToolSelected(MediaTool.MOVE_MEDIA),
        }
    },

    template: `
        <MediaFilesUploader
            v-if="isFileUploaderToolSelected"/>
        <NewFolder
            v-if="isNewFolderToolSelected"/>
        <MoveMedia
            v-if="isMoveMediaToolSelected"/>
        <RenameMedia
            v-if="isRenameMediaToolSelected"/>
        <DeleteMedia
            v-if="isDeleteMediaToolSelected"/>
    `,
})
