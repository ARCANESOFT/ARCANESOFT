import Directive from './directive'

export default class DirectiveExtractor {
    protected _elt: Element|any
    protected _directives: Array<Directive>

    constructor(elt: Element|any, namespace: string = 'arc') {
        this._elt = elt
        this._directives = []
        this.init(namespace)
    }

    private init(namespace: string): void {
        this._directives = this._elt
            .getAttributeNames()
            .filter((name) => name.match(new RegExp(`${namespace}:`)))
            .map((name) => this.makeDirective(name, namespace))
    }

    private makeDirective(name: string, namespace: string): Directive {
        const [type, ...modifiers] = name
            .replace(new RegExp(`${namespace}:`), '')
            .split('.')

        return new Directive(type, modifiers, name, this._elt.getAttribute(name))
    }

    public directives(): Array<Directive> {
        return this._directives
    }

    public get(type): Directive|undefined {
        return this
            .directives()
            .find((directive) => directive.type === type)
    }

    public has(type): boolean {
        return this
            .directives()
            .map((directive: Directive) => directive.type).includes(type)
    }

    public missing(type): boolean {
        return ! this.has(type)
    }

    public isEmpty(): boolean {
        return this.directives().length === 0
    }

    public isNotEmpty(): boolean {
        return ! this.isEmpty()
    }
}
