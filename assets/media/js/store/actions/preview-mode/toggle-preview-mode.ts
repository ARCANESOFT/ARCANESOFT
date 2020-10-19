import mutations from "../../mutations"
import previewModeState from '../../getters/preview-mode/preview-mode-state'

export default (): void => mutations.setPreviewMode( ! previewModeState)
