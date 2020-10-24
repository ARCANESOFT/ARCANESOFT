import { EventType } from '../helpers/event-emitter'
import { RequestConfig, RequestInstance } from '../helpers/request'

export interface Arcanesoft {
    run(): void
    getLocale(): string

    on(event: EventType, callback: Function): this
    once(event: EventType, handler: Function): this
    off(type: EventType | '*', handler?: Function): this
    emit(event: EventType, ...args: any[]): this

    request(options?: RequestConfig): RequestInstance
    csrf(): string

    bootComponents(dom: Document|Element): void
}
