import state from './state'

export type Mutations = {
    setShown(shown: boolean): void
}

export default (): Mutations => {
    const setShown = (shown: boolean): void => {
        state.shown = shown
    }

    return {
        setShown,
    }
}
