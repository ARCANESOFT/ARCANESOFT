import { useState } from './state'
import { DatatableResponse } from '../types'

export type Mutations = {
    markAsReady: () => void
    startLoading: () => void
    stopLoading: () => void
    setDraw: (draw: number) => void
    setResults: (results: DatatableResponse) => void
    setPayloadUrl: (url: string) => void
    setPayloadParams: (params: Object) => void
    setPayloadQuery: (query: Object) => void
    resetPaginationUrl: () => void
}

export default (): Mutations => {
    const state = useState()

    const markAsReady = (): void => {
        state.ready = true
    }

    const startLoading = (): void => {
        state.loading = true
    }

    const stopLoading = (): void => {
        state.loading = false
    }

    const setDraw = (draw: number) => {
        state.draw = draw
    }

    const setResults = (results: DatatableResponse): void => {
        state.results = results
    }

    const setPayloadUrl = (url: string): void => {
        state.payload.url = url
    }

    const setPayloadParams = (params: Object): void => {
        state.payload.params = params
    }

    const setPayloadQuery = (query: Object): void => {
        setPayloadParams({
            query: {
                ...(state.payload.params['query'] || {}),
                ...query,
            }
        })
    }

    const resetPaginationUrl = (): void => {
        let parts = state.payload.url.split('?')
        let params = new URLSearchParams(parts[1])
        params.delete('page')

        setPayloadUrl(`${parts[0]}?${params.toString()}`)
    }

    return {
        markAsReady,
        startLoading,
        stopLoading,
        setDraw,
        setResults,
        setPayloadUrl,
        setPayloadParams,
        setPayloadQuery,
        resetPaginationUrl,
    }
}
