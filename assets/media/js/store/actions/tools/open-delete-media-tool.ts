import {isNotEmpty as hasSelectedItems} from '../../getters/media/selected-media-items'
import mutations from '../../mutations'
import { MEDIA_TOOLS } from '../../../enums'

export default (): void => {
    if (hasSelectedItems())
        mutations.setActiveMediaTool(MEDIA_TOOLS.DELETE_MEDIA)
}
