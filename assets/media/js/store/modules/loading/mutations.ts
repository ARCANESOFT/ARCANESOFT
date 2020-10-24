import state from './state'

export type Mutations = {
    setLoading(loading: boolean): void
}

export default (): Mutations => {
    const setLoading = (loading: boolean): void => {
        state.loading = loading
    }

    return {
        setLoading,
    }
}

