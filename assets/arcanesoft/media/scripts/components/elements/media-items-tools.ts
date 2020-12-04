import { defineComponent, computed, ComputedRef } from 'vue'
import useGetters from '../../store/getters'
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
        const { activeMediaTool } = useGetters()

        const isMediaToolSelected = (tool: MediaTool): ComputedRef<boolean> => {
            return computed<boolean>(() => activeMediaTool.value === tool)
        }

        return {
            isFileUploaderToolSelected: isMediaToolSelected(MediaTool.FILE_UPLOADER),
            isNewFolderToolSelected:    isMediaToolSelected(MediaTool.NEW_FOLDER),
            isMoveMediaToolSelected:    isMediaToolSelected(MediaTool.MOVE_MEDIA),
            isRenameMediaToolSelected:  isMediaToolSelected(MediaTool.RENAME_MEDIA),
            isDeleteMediaToolSelected:  isMediaToolSelected(MediaTool.DELETE_MEDIA),
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
