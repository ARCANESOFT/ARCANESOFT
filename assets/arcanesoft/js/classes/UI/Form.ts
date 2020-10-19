export default class Form {
    protected _elt: Element

    constructor(element: Element) {
        this._elt = element
    }

    public static make(element: Element|string): Form {
        if (typeof element === 'string')
            element = document.querySelector(element)

        return new Form(<Element> element)
    }

    public elt(): Element {
        return this._elt
    }

    /**
     * Get the form's action attribute.
     */
    public getAction(): string|null {
        return this.elt().getAttribute('action')
    }

    /**
     * Set the form's action attribute.
     *
     * @param  {string}  action
     */
    public setAction(action: string): this {
        this.elt().setAttribute('action', action)

        return this
    }

    public on(event: string, callback: EventListenerOrEventListenerObject): this {
        this.elt().addEventListener(event, callback)

        return this
    }
}
