export type EventType = string | symbol

// An event handler can take an optional event argument
// and should not return a value
export type Handler<T = any> = (event?: T) => void
export type WildcardHandler = (type: EventType, event?: any) => void

// An array of all currently registered event handlers for a type
export type EventHandlerList = Array<Handler>
export type WildCardEventHandlerList = Array<WildcardHandler>

export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>
