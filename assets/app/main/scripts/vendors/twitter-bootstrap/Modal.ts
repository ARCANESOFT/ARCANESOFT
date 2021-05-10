// import { Modal as BaseModal } from 'bootstrap/dist/js/bootstrap.esm'
import BaseModal from 'bootstrap/js/src/modal.js'

export default class Modal extends BaseModal {
    public _element: Element

    constructor(element: Element, config?: Object) {
        super(element, config)
    }

    public static make(element: Element|string, config?: Object): Modal {
        if (typeof element === 'string')
            element = document.querySelector(element)

        return new Modal(<Element> element, config)
    }

    public on(event: string, callback: EventListenerOrEventListenerObject): this {
        this._element.addEventListener(`${event}.bs.modal`, callback)

        return this
    }
}
