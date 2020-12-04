import { App } from '@vue/runtime-core'
import emitter, { EventterInterface, EventType, WildcardHandler } from '@arcanescripts/eventter'
import { RequestInstance, RequestConfig } from '@arcanescripts/request'
import Csrf from '@arcanesoft/core/src/helpers/csrf'
import { Arcanesoft as ArcanesoftContract } from '@arcanesoft/core/src/contracts/arcanesoft'
import { ArcanesoftConfig } from './types'
import request from '../../helpers/request'
import app from '../../vue/app'
import UI from '../ui'

class Arcanesoft implements ArcanesoftContract {
    // Properties
    //----------------------------------

    public app: App
    public emitter: EventterInterface
    public ui: UI
    protected _config: ArcanesoftConfig
    protected _started: Boolean = false

    // Constructor
    //----------------------------------

    public constructor(config?: ArcanesoftConfig) {
        this.app = app
        this._config = config || {}
        this.emitter = emitter()
        this.ui = new UI
    }

    // Main Methods
    //----------------------------------

    public run(): void {
        if (this._started === true)
            return

        this.emit('arcanesoft::starting', this)

        this.app.mount(this._config.vue.rootContainer)

        this.emit('arcanesoft::started', this)

        this._started = true
    }

    public getLocale(): string {
        return this._config['locale']
            || document.querySelector('html').getAttribute('lang')
    }

    /**
     * Register a listener on built-in event bus
     */
    public on(event: EventType, callback: WildcardHandler): this {
        this.emitter.on(event, callback)

        return this
    }

    /**
     * Register a one-time listener on the event bus
     */
    public once(event: EventType, handler: WildcardHandler): this {
        this.emitter.once(event, handler)

        return this
    }

    /**
     * Unregister an listener on the event bus
     */
    public off(type: EventType | '*', handler?: WildcardHandler): this {
        this.emitter.off(type, handler)

        return this
    }

    /**
     * Emit an event on the event bus
     */
    public emit(event: EventType, ...args: any[]): this {
        this.emitter.emit(event, ...args)

        return this
    }

    // Utilities
    //----------------------------------

    /**
     * Return an instance configured to make HTTP requests.
     */
    public request = (options?: RequestConfig): RequestInstance => request(options)

    /**
     * Get the CSRF Token.
     */
    public csrf(): string {
        return Csrf.token()
    }

    // Other Methods
    //----------------------------------

    public bootComponents(dom: Document): void {
        this.ui.initToasts(dom)
        this.ui.initTooltips(dom)
        this.ui.initPageScrolled()
        // this.ui.initTextAutosize()
    }
}

export {
    Arcanesoft,
    ArcanesoftContract,
    ArcanesoftConfig,
}

export default (config: ArcanesoftConfig): ArcanesoftContract => {
    return window['ARCANESOFT'] = new Arcanesoft(config)
}
