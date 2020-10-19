import { App } from "@vue/runtime-core";
import app from './../vue/App'
import UI from './UI'
import EventEmitter, {EventType} from "./Utilities/EventEmitter"

export default class Arcanesoft {
    // Properties
    //----------------------------------

    public app: App
    public emitter: EventEmitter
    public ui: UI
    protected _config: Object
    public launched: Boolean = false

    // Constructor
    //----------------------------------

    public constructor(config?: {}) {
        this.app = app
        this._config = config || {}
        this.emitter = new EventEmitter
        this.ui = new UI
    }

    // Main Methods
    //----------------------------------

    public run(): void {
        if (this.launched === true)
            return

        this.$emit('arcanesoft::starting', this)

        this.app.mount(this._config['rootContainer'])

        this.$emit('arcanesoft::started', this)

        this.launched = true
    }

    public getLocale(): string {
        return this._config['locale']
            || document.querySelector('html').getAttribute('lang')
    }

    /**
     * Register a listener on built-in event bus
     */
    public $on(event: EventType, callback: Function): this {
        this.emitter.on(event, callback)

        return this
    }

    /**
     * Register a one-time listener on the event bus
     */
    public $once(event: EventType, handler: Function): void {
        this.emitter.once(event, handler)
    }

    /**
     * Unregister an listener on the event bus
     */
    public $off(type: EventType | '*', handler?: Function): void {
        this.emitter.off(type, handler)
    }

    /**
     * Emit an event on the event bus
     */
    public $emit(event: EventType, ...args: any[]): void {
        this.emitter.emit(event, ...args)
    }

    // Utilities
    //----------------------------------

    /**
     * Return an instance configured to make HTTP requests.
     */
    public request(options?: Object) {
        return window['request'](options)
    }

    // Other Methods
    //----------------------------------

    public initComponents(dom: Document|Element): void {
        this.ui.initToasts(dom)
        this.ui.initTooltips(dom)
        this.ui.initPageScrolled()
        this.ui.initTextAutosize()
    }
}
