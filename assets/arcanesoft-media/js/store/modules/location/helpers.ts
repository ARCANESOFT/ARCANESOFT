import getters from './getters'

export type Helpers = {
    normalize(path: string): string
}

export default (): Helpers => {
    const { current, isRoot } = getters()

    const normalize = (path: string): string => isRoot.value ? path : `${current.value}/${path}`

    return {
        normalize,
    }
}
