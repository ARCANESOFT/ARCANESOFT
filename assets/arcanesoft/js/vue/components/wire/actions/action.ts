import ActionPayload from '../types/action-payload'
import ActionType from '../enums/action-type'

export default class Action {
    public type: ActionType
    public payload: Object
    private elt: Element
    private event: {
        type: string,
        callback: EventListenerOrEventListenerObject
    };

    constructor(elt: Element, type: ActionType, payload: Object) {
        this.elt = elt
        this.type = type
        this.payload = payload
    }

    public addToPayload(key: string, value: any): Action {
        this.payload[key] = value

        return this
    }

    public toArray(): ActionPayload {
        return {
            type: this.type,
            payload: this.payload,
        }
    }

    public on(type: string, callback: EventListenerOrEventListenerObject): Action {
        this.event = {type, callback}

        this.elt.addEventListener(this.event.type, this.event.callback, false)

        return this
    }

    public destroy(): void {
        this.elt.removeEventListener(this.event.type, this.event.callback)
    }
}
