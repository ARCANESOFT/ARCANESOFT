export default (value, callback: Function = null) => {
    if (callback !== null)
        callback(value)

    return value
}
