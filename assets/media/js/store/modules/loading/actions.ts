import mutations from './mutations'

export type Actions = {
    start(): void
    stop():  void
}

export default (): Actions => {
    const { setLoading } = mutations()

    const start = (): void => {
        setLoading(true)
    }

    const stop = (): void => {
        setLoading(false)
    }

    return {
        start,
        stop,
    }
}
