import Action from './actions/action'
import MethodAction from './actions/method'
import ModelAction from './actions/model'
import ComponentPayload from './types/component-payload'
import Directive from './dom/directive'
import DirectiveExtractor from './dom/directive-extractor'
import QuerySelector from './dom/query-selector'
import arcanesoft from '../../../helpers/arcanesoft'

const COMPONENT_NAMESPACE = 'arc'
const COMPONENT_ACTION_EVENT = 'arcanesoft::components.action'

export default class Component {
    public name: string
    public data: Object
    protected dom: HTMLElement
    private actions: Array<MethodAction|ModelAction>

    constructor(name: string, data?: Object) {
        this.name = name
        this.actions = []
        this.setData(data)
    }

    protected setDOM(dom: HTMLElement): this {
        this.dom = dom

        return this
    }

    public setData(data: Object): this {
        this.data = data

        return this
    }

    public scan(dom: HTMLElement): void {
        this.setDOM(dom)
        this.resetActions()

        QuerySelector.startsWithNamespace(dom, COMPONENT_NAMESPACE).forEach((elt) => {
            const directives = new DirectiveExtractor(elt, COMPONENT_NAMESPACE).directives();

            directives.forEach((directive: Directive) => {
                switch (directive.type) {
                    case 'model':
                        this.actions.push(this.makeModelAction(elt, directive))
                        break

                    case 'click':
                        this.actions.push(this.makeMethodAction(elt, directive))
                        break

                    default:
                        // The given directive type is not supported
                        break
                }
            })
        })
    }

    private resetActions(): void {
        this.actions.forEach((action) => {
            action.destroy()
        })

        this.actions = []
    }

    /**
     * Convert the component into an associative array.
     *
     * @return ComponentPayload
     */
    public toArray(): ComponentPayload {
        return {
            name: this.name,
            data: this.data,
        }
    }

    private makeModelAction(elt: Element|any, directive: Directive): ModelAction {
        const action = ModelAction.make(elt, directive)

        return action.on('change', (e): void => {
            action.addToPayload('value', e.target['value'])

            this.emitActionEvent(action)
        })
    }

    private makeMethodAction(elt: Element|any, directive: Directive): MethodAction {
        const action = MethodAction.make(elt, directive)

        return action.on(directive.type, (e): void => {
            if (directive.hasModifier('prevent'))
                e.preventDefault()

            this.emitActionEvent(action)
        })
    }

    private emitActionEvent(action: Action|any): void {
        arcanesoft().$emit(COMPONENT_ACTION_EVENT, {
            component: this,
            action: action.toArray(),
        })
    }
}
