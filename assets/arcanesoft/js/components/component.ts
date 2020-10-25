abstract class Component {
    protected _element: HTMLElement
    protected options: Object | null

    constructor(element: HTMLElement | string, options?: Object) {
        if (typeof element === 'string')
            element = <HTMLElement> document.querySelector(element)

        this._element = element
        this.options = options || {}
    }

    public elt(): HTMLElement | any {
        return this._element
    }
}

export default Component
