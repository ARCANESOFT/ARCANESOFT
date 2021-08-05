import BaseModal from 'bootstrap/js/src/modal'

const EVENT_KEY = `.bs.modal`

class Modal extends BaseModal {
    public _element: HTMLElement

    constructor(element: HTMLElement | string, config?: Object) {
        if (typeof element === 'string')
            element = <HTMLElement> document.querySelector(element)

        super(element, config)
    }

    public elt(): HTMLElement {
        return this._element
    }

    public on(event: string, callback: EventListenerOrEventListenerObject): this {
        this.elt().addEventListener(`${event}${EVENT_KEY}`, callback)

        return this
    }
}

export default (elt: HTMLElement | string): Modal => new Modal(elt)
