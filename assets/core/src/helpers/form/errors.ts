export default class FormErrors {
    // Properties //

    protected messages: Object = {};

    protected format: string = ':message';

    // Constructor //

    /**
     * Instantiate the FormErrors.
     */
    public constructor(messages: Object = {}) {
        this.setMessages(messages);
    }

    // Getters & Setters //

    /**
     * Get the raw messages.
     */
    public getMessages(): Object {
        return this.messages;
    }

    /**
     * Set the raw messages.
     */
    public setMessages(messages: Object): this {
        this.messages = messages;

        return this;
    }

    /**
     * Get the default message format.
     *
     * @return {string}
     */
    public getFormat(): string {
        return this.format;
    }

    /**
     * Set the default message format.
     */
    public setFormat(format: string): this {
        this.format = format

        return this
    }

    // Main Method //

    /**
     * Add a message to the collection.
     */
    add(key: string, message: string): this {
        if (this.isUnique(key, message)) {
            if (this.messages[key])
                this.messages[key].push(message)
            else
                this.messages[key] = [message]
        }

        return this
    }

    /**
     * Merge a new array of messages into the collection.
     */
    public merge(messages: Object): void {
        messages = Object.assign({}, this.getMessages(), messages)

        this.setMessages(messages)
    }

    /**
     * Get the keys present in the message bag.
     */
    public keys(): string[] {
        return Object.keys(this.getMessages())
    }

    /**
     * Determine if messages exist for all of the given keys.
     */
    public has(key?: string | string[]): boolean {
        if (key) {
            let keys = Array.isArray(key) ? key : [key]

            for (let index in keys) {
                if (this.first(keys[index]) === '') return false
            }

            return true
        }

        return this.any()
    }

    /**
     * Determine if messages exist for any of the given keys.
     */
    public hasAny(keys: string[]): boolean {
        for(let index in keys) {
            if (this.has(keys[index])) return true
        }

        return false
    }

    /**
     * Get the first message from the bag for a given key.
     */
    public first(key: string, format?: string): string {
        let messages = (key) ? this.get(key, format) : this.all(format)

        let firstMessage: string | string[] | Object

        if (typeof messages === 'object' && messages !== null)
            firstMessage = messages[Object.keys(messages)[0]]

        if (typeof firstMessage === 'string')
            return firstMessage;

        return Array.isArray(firstMessage) ? firstMessage[0] || '' : ''
    }

    /**
     * Get all of the messages from the bag for a given key.
     */
    public get(key: string, format?: string): any {
        if (this.getMessages().hasOwnProperty(key)) {
            return this.transform(this.getMessages()[key] || [], format, key)
        }

        return key.includes('*')
            ? this.getMessagesForWildcardKey(key, format)
            : []
    }

    /**
     * Get all errors.
     */
    public all(format?: string): Object {
        let all = {}

        if (this.any()) {
            this.keys().forEach((key) => {
                all[key] = this.get(key, format)
            })
        }

        return all
    }

    /**
     * Reset all the validation messages.
     */
    public reset(): void {
        this.setMessages({})
    }

    /**
     * Determine if the message bag has any messages.
     */
    public any(): boolean {
        return this.count() > 0
    }

    /**
     * Determine if the message bag has any messages.
     */
    public isEmpty(): boolean {
        return ! this.any()
    }

    /**
     * Get the number of messages.
     */
    public count(): number {
        return this.keys().length
    }

    // Other Methods //

    /**
     * Get the appropriate format based on the given format.
     */
    private checkFormat(format: string): string {
        return format || this.format
    }

    /**
     * Format an array of messages.
     *
     * @param  {string[]}  messages
     * @param  {string}    format
     * @param  {string}    key
     *
     * @return {string[]}
     */
    private transform(messages: string[], format: string, key: string) {
        format = this.checkFormat(format)

        return messages.map((message) => {
            return format
                .replace(new RegExp(':message', 'g'), message)
                .replace(new RegExp(':key', 'g'), key)
        })
    }

    /**
     * Get the messages for a wildcard key.
     */
    private getMessagesForWildcardKey(key: string, format: string): Object {
        let regex    = new RegExp(`^${key}$`)
        let messages = Object.keys(this.getMessages()).reduce((m, k) => {
            return regex.test(k)
        }, {});

        let transformed = {}

        for (let k in messages) {
            transformed[k] = this.transform(messages[k], format, k)
        }

        return transformed
    }

    /**
     * Determine if a key and message combination already exists.
     */
    private isUnique(key: string, message: string): boolean {
        if (this.messages[key]) {
            return ! this.messages[key].includes(message)
        }

        return true
    }
}
