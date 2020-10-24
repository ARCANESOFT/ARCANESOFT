import state from './state'

export type Mutations = {
    setCurrent(location: string): void
}

export default (): Mutations => {
    const setCurrent = (location: string): void => {
        state.location = location
    }

    return {
        setCurrent,
    }
}
