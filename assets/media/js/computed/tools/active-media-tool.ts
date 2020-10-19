import { computed } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import activeMediaTool from '../../store/getters/tools/active-media-tool'

export default computed((): MEDIA_TOOLS | null => activeMediaTool())
