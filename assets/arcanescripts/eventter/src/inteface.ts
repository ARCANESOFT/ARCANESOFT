import { EventHandlerMap, EventType, Handler, WildcardHandler } from './types'

export default interface Emitter {
    events: EventHandlerMap;

    on<T = any>(type: EventType, handler: Handler<T>): void
    on(type: '*', handler: WildcardHandler): void

    once<T = any>(type: EventType, handler: Handler<T>): void
    once(type: '*', handler: WildcardHandler)

    off<T = any>(type: EventType, handler: Handler<T>): void
    off(type: '*', handler: WildcardHandler): void

    emit<T = any>(type: EventType, event?: T): void
    emit(type: '*', event?: any): void
}
