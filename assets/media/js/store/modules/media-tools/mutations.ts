import { MEDIA_TOOLS } from '../../../enums'
import state from './state'

export type Mutations = {
    setTool(tool: MEDIA_TOOLS): void
}

export default (): Mutations => {
    const setTool = (tool: MEDIA_TOOLS): void => {
        state.tool = tool
    }

    return {
        setTool,
    }
}
