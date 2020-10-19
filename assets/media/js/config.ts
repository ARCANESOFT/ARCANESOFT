import { DISPLAY_MODES } from './enums'
import displayModes from './config/display-modes'
import uppy from './config/uppy'

export default {
    baseUrl: '/admin/media/api',

    defaultDisplayMode: DISPLAY_MODES.THUMBNAILS,

    displayModes,

    previewMode: true,

    uppy,
}
