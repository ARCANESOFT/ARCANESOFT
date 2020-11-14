import { computed, ComputedRef } from 'vue'
import { MEDIA_TOOLS } from '../../../enums'
import state from './state'

export type Helpers = {
    isSelected(tool: MEDIA_TOOLS): ComputedRef<boolean>
}

export default (): Helpers => {
    const isSelected = (tool: MEDIA_TOOLS): ComputedRef<boolean> => computed<boolean>(() => state.tool === tool)

    return {
        isSelected
    }
}
