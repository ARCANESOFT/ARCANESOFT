export default (callback: Function, wait: number, immediate: boolean = false) => {
    let timeout

    return (...args): void => {
        let callNow = immediate && ! timeout

        clearTimeout(timeout)

        timeout = setTimeout(() => {
            timeout = null
            if ( ! immediate)
                callback.apply(this, args)
        }, wait)

        if (callNow)
            callback.apply(this, args)
    }
}
