type ErrorMessages = {
    [key: string]: string[]
}

class FormErrors {
    // Properties
    //--------------------------

    protected errors: ErrorMessages = {}
    protected format: string = ':message'

    // Constructor
    //--------------------------

    /**
     * Instantiate the FormErrors.
     */
    public constructor(errors?: ErrorMessages) {
        this.setErrors(errors || {})
    }

    // Getters & Setters
    //--------------------------

    /**
     * Get the raw error messages.
     */
    public getErrors(): ErrorMessages {
        return this.errors
    }

    /**
     * Set the error messages.
     */
    public setErrors(errors: ErrorMessages): this {
        this.errors = errors

        return this
    }

    /**
     * Get the default message format.
     */
    public getFormat(): string {
        return this.format
    }

    /**
     * Set the default message format.
     */
    public setFormat(format: string): this {
        this.format = format

        return this
    }

    // Main Methods
    //--------------------------

    /**
     * Get the keys present in the message bag.
     */
    public keys(): string[] {
        return Object.keys(this.getErrors())
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
     * Get all of the errors from the bag for a given key.
     */
    public get(key: string, format?: string): ErrorMessages | string[] {
        if (this.getErrors().hasOwnProperty(key))
            return this.transform(this.getErrors()[key] || [], format, key)

        if (key.includes('*'))
            return this.getErrorsForWildcardKey(key, format)

        return []
    }

    /**
     * Determine if errors exist for all of the given keys.
     */
    public has(keys: string | string[]): boolean {
        keys = Array.isArray(keys) ? keys : [keys]

        for (let index in keys) {
            if (this.first(keys[index]) === null)
                return false
        }

        return true
    }

    /**
     * Add a message to the collection.
     */
    public add(key: string, message: string): this {
        if (this.isUnique(key, message)) {
            if (this.errors[key])
                this.errors[key].push(message)
            else
                this.errors[key] = [message]
        }

        return this
    }

    /**
     * Merge a new array of errors into the collection.
     */
    public merge(errors: ErrorMessages): this {
        errors = Object.assign({}, this.getErrors(), errors)

        return this.setErrors(errors)
    }

    /**
     * Determine if errors exist for any of the given keys.
     */
    public hasAny(keys: string[]): boolean {
        for(let index in keys) {
            if (this.has(keys[index]))
                return true
        }

        return false
    }

    /**
     * Get the first message from the bag for a given key.
     */
    public first(key: string, format?: string): string | null {
        let errors = this.get(key, format)

        let firstError: ErrorMessages | string[] | undefined

        if (typeof errors === 'object' && errors !== null)
            firstError = errors[Object.keys(errors)[0]]

        if (typeof firstError === 'string')
            return firstError

        if (Array.isArray(firstError))
            return firstError[0] || null

        return null
    }

    /**
     * Reset all the validation errors.
     */
    public reset(): void {
        this.setErrors({})
    }

    /**
     * Determine if the message bag has any errors.
     */
    public any(): boolean {
        return this.count() > 0
    }

    /**
     * Determine if the errors messages is not empty.
     *
     * @see any()
     */
    public isNotEmpty(): boolean {
        return this.any()
    }

    /**
     * Determine if the errors messages is empty.
     */
    public isEmpty(): boolean {
        return ! this.isNotEmpty()
    }

    /**
     * Get the number of errors.
     */
    public count(): number {
        return this.keys().length
    }

    // Other Methods
    //--------------------------

    /**
     * Format an array of errors.
     */
    private transform(errors: string[], format: string, key: string) {
        format = format || this.format

        return errors.map(
            (message) => format
                .replace(new RegExp(':message', 'g'), message)
                .replace(new RegExp(':key', 'g'), key)
        )
    }

    /**
     * Get the errors for a wildcard key.
     */
    private getErrorsForWildcardKey(key: string, format: string): ErrorMessages {
        const errors = this.getErrors()
        const regex = new RegExp(`^${key}$`)

        return Object.keys(errors)
            .filter(key => regex.test(key))
            .reduce((filtered, key) => {
                filtered[key] = this.transform(errors[key], format, key)
                return filtered
            }, {})
    }

    /**
     * Determine if a key and message combination already exists.
     */
    private isUnique(key: string, message: string): boolean {
        if (this.errors[key]) {
            return ! this.errors[key].includes(message)
        }

        return true
    }
}

export default (errors?: ErrorMessages) => new FormErrors(errors)

export {
    FormErrors,
    ErrorMessages,
}
