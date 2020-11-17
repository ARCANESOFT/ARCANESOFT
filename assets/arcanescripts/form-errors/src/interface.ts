import { ErrorMessages } from './types'

export default interface FormErrorsInterface {
    // Getters & Setters
    //--------------------------

    /**
     * Get the raw error messages.
     */
    getErrors(): ErrorMessages

    /**
     * Set the error messages.
     */
    setErrors(errors: ErrorMessages): this

    /**
     * Get the default message format.
     */
    getFormat(): string

    /**
     * Set the default message format.
     */
    setFormat(format: string): this

    // Main Methods
    //--------------------------

    /**
     * Get the keys present in the message bag.
     */
    keys(): string[]

    /**
     * Get all errors.
     */
    all(format?: string): Object

    /**
     * Get all of the errors from the bag for a given key.
     */
    get(key: string, format?: string): ErrorMessages | string[]

    /**
     * Determine if errors exist for all of the given keys.
     */
    has(keys: string | string[]): boolean

    /**
     * Add a message to the collection.
     */
    add(key: string, message: string): this

    /**
     * Merge a new array of errors into the collection.
     */
    merge(errors: ErrorMessages): this

    /**
     * Determine if errors exist for any of the given keys.
     */
    hasAny(keys: string[]): boolean

    /**
     * Get the first message from the bag for a given key.
     */
    first(key: string, format?: string): string | null

    /**
     * Reset all the validation errors.
     */
    reset(): void

    /**
     * Determine if the message bag has any errors.
     */
    any(): boolean

    /**
     * Determine if the errors messages is not empty.
     *
     * @see any()
     */
    isNotEmpty(): boolean

    /**
     * Determine if the errors messages is empty.
     */
    isEmpty(): boolean

    /**
     * Get the number of errors.
     */
    count(): number
}
