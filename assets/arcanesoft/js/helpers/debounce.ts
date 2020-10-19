export default (callback: Function, delay: number) => {
    let timeoutID = null

    return function (...args): void {
        clearTimeout(timeoutID)

        timeoutID = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}
