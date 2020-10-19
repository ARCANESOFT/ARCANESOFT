import { computed } from 'vue'
import activeMediaTool from './active-media-tool'

export default computed((): boolean => activeMediaTool.value !== null)
