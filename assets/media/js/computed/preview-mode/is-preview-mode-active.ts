import { computed } from 'vue'
import previewModeState from '../../store/getters/preview-mode/preview-mode-state'

export default computed((): boolean => previewModeState())
