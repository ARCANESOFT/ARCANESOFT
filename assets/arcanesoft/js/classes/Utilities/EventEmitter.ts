export type EventType = string | symbol

// An event handler can take an optional event argument
// and should not return a value
export type Handler<T = any> = (event?: T) => void
export type WildcardHandler = (type: EventType, event?: any) => void

// An array of all currently registered event handlers for a type
export type EventHandlerList = Array<Handler>
export type WildCardEventHandlerList = Array<WildcardHandler>

export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>

export interface EmitterInterface {
    on<T = any>(type: EventType, handler: Handler<T>): void
    on(type: '*', handler: WildcardHandler): void

    once<T = any>(type: EventType, handler: Handler<T>): void
    once(type: '*', handler: WildcardHandler)

    off<T = any>(type: EventType, handler: Handler<T>): void
    off(type: '*', handler: WildcardHandler): void

    emit<T = any>(type: EventType, event?: T): void
    emit(type: '*', event?: any): void
}

export default class EventEmitter implements EmitterInterface {
    protected events: EventHandlerMap

    constructor(events?: EventHandlerMap) {
        this.events = events || new Map
    }

    public off(type: EventType | '*', handler): void {
        const handlers = this._getEvent(type)

        if (handlers)
            handlers.splice(handlers.indexOf(handler) >>> 0, 1)
    }

    public on(type: EventType | '*', handler): void {
        const handlers = this._getEvent(type)
        const added    = handlers && handlers.push(handler)

        if ( ! added)
            this.events.set(type, [handler])
    }

    public emit(type: EventType | '*', payload?): void {
        this._getEvent(type, []).slice().map(handler => { handler(payload) })
        this._getEvent('*', []).slice().map((handler) => { handler(type, payload) })
    }

    public once(type: EventType | '*', handler): void {
        const wrappedHandler = (event) => {
            handler(event)
            this.off(type, wrappedHandler)
        }

        this.on(type, wrappedHandler)
    }

    private _getEvent(type: EventType | '*', defaultValue?): EventHandlerList|WildCardEventHandlerList|Array<any>|undefined {
        return this.events.get(type) || defaultValue
    }
}
