import useState from './state'

export type Mutations = {
    markAsReady: () => void
    resetPaginationUrl: () => void
}

export default (): Mutations => {
    const state = useState()

    const markAsReady = (): void => {
        state.ready = true
    }

    const resetPaginationUrl = (): void => {
        let parts = state.payload.url.split('?')
        let params = new URLSearchParams(parts[1])
        params.delete('page')

        state.payload.url = `${parts[0]}?${params.toString()}`
    }

    return {
        markAsReady,
        resetPaginationUrl,
    }
}
