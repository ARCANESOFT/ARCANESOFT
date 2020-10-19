export default class QuerySelector {
    public static startsWithNamespace(elt: Element|any, namespace: string, selectors: string = '*'): Array<Element|any> {
        return QuerySelector.queryAll(elt, selectors).filter(
            (e) => Array.from(e.attributes).find(({name}) => name.startsWith(`${namespace}:`))
        )
    }

    public static queryAll(elt: Element|any, selectors: any): Array<Element|any> {
        return Array.from(elt.querySelectorAll(selectors))
    }
}
