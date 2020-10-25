import {EventType, Handler, WildcardHandler} from '../helpers/event-emitter'
import { RequestConfig, RequestInstance } from '../helpers/request'

export interface Arcanesoft {
    run(): void
    getLocale(): string

    on<T = any>(event: EventType, handler: Handler<T>): this
    on(type: '*', handler: WildcardHandler): this

    once<T = any>(type: EventType, handler: Handler<T>): this
    once(type: '*', handler: WildcardHandler): this

    off<T = any>(type: EventType, handler: Handler<T>): this
    off(type: '*', handler: WildcardHandler): this

    emit<T = any>(type: EventType, event?: T): this
    emit(type: '*', event?: any): this

    request(options?: RequestConfig): RequestInstance
    csrf(): string

    bootComponents(dom: Document|Element): void
}
