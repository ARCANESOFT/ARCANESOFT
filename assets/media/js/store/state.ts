import { reactive } from 'vue'
import config from '../config'

export default reactive({

    loading: false,

    currentLocation: "/",

    displayMode: config.defaultDisplayMode,

    previewMode: config.previewMode,

    mediaItems: [],

    selectedMediaItem: [],

    activeMediaTool: null,

})
