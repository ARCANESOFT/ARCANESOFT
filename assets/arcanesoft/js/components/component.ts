class Component {
    protected _element: HTMLElement

    constructor(element: HTMLElement | string, options?: Object) {
        if (typeof element === 'string')
            element = <HTMLElement> document.querySelector(element)

        this._element = element
    }

    public elt(): HTMLElement | any {
        return this._element
    }
}

export default Component
