import { MEDIA_TOOLS } from '../../../enums'
import mutations from './mutations'

export type Actions = {
    open(tool: MEDIA_TOOLS): void
    close(): void
}

export default (): Actions => {
    const { setTool } = mutations()

    const open = (tool: MEDIA_TOOLS): void => setTool(tool)
    const close = (): void => setTool(null)

    return {
        open,
        close,
    }
}
