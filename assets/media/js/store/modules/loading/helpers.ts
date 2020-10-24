import actions from './actions'

export type Helpers = {
    handleLoading(callback: Function): Promise<void>
}

export default (): Helpers => {
    const { start, stop } = actions()

    const handleLoading = async (callback: Function): Promise<void> => {
        start()
        await callback()
        stop()
    }

    return {
        handleLoading
    }
}
