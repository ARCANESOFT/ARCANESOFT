import Action from './action'
import ActionType from '../enums/action-type'
import Directive from '../dom/Directive'

export default class Model extends Action {
    /**
     * Make a new model action.
     */
    public static make(elt: HTMLInputElement, directive: Directive): Model {
        return new Action(elt, ActionType.MODEL, {
            name:  directive.value,
            value: elt.value,
        })
    }
}
