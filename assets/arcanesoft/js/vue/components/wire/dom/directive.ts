import ParsedMethod from '../types/parsed-method'

export default class Directive {
    public type: string;
    public modifiers: Array<string>
    protected attributeName: string
    protected attributeValue: string|null

    constructor(type: string, modifiers: Array<string>, attributeName: string, attributeValue: string|null) {
        this.type = type
        this.modifiers = modifiers
        this.attributeName = attributeName
        this.attributeValue = attributeValue
    }

    public get value() {
        return this.attributeValue
    }

    public get method() {
        return Directive.parseOutMethodAndParams(this.value).method
    }

    public get params() {
        return Directive.parseOutMethodAndParams(this.value).params
    }

    public hasModifier(modifier: string): boolean {
        return this.modifiers.includes(modifier)
    }

    private static parseOutMethodAndParams(rawMethod: string|null): ParsedMethod {
        let method    = rawMethod
        let params    = []
        const matches = rawMethod.match(/(.*?)\((.*)\)/)

        if (matches) {
            method = matches[1]
            params = eval(`((...params) => [...params])(${matches[2]})`)
        }

        return {
            method,
            params,
        }
    }
}
