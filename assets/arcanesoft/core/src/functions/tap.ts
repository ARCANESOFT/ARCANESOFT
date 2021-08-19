export default <T = any>(value: T, callback?: (value: T) => void): T => {
    if (callback !== null)
        callback(value)

    return value
}
