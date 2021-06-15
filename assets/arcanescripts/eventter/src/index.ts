import EventterInterface from './inteface'

import {
    EventType,
    EventHandlerMap,
    EventHandlerList,
    Handler,
    WildcardHandler,
    WildCardEventHandlerList,
} from './types'

export {
    EventType,
    EventHandlerMap,
    EventHandlerList,
    Handler,
    WildcardHandler,
    WildCardEventHandlerList,
    EventterInterface,
}

export default (events?: EventHandlerMap): EventterInterface => {
    events = events || new Map

    const on = (type: EventType | '*', handler): void => {
        const handlers = _getEvent(type)
        const added    = handlers && handlers.push(handler)

        if ( ! added)
            events.set(type, [handler])
    }

    const off = (type: EventType | '*', handler): void => {
        const handlers = _getEvent(type)

        if (handlers)
            handlers.splice(handlers.indexOf(handler) >>> 0, 1)
    }

    const once = <T = any>(type: EventType | '*', handler: Handler<T>): void => {
        const wrappedHandler = (event) => {
            handler(event)
            off(type, wrappedHandler)
        }

        on(type, wrappedHandler)
    }

    const emit = (type: EventType | '*', payload?): void => {
        _getEvent(type, []).slice().map(handler => { handler(payload) })
        _getEvent('*', []).slice().map((handler) => { handler(type, payload) })
    }

    const _getEvent = (type: EventType | '*', defaultValue?): EventHandlerList | WildCardEventHandlerList | Array<any> | undefined => {
        return events.get(type) || defaultValue
    }

    return {
        events,
        on,
        off,
        once,
        emit,
    }
}

