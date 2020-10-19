import Action from './action'
import ActionType from '../enums/action-type'
import Directive from '../dom/Directive'

export default class Method extends Action {
    /**
     * Make a new method action.
     */
    public static make(elt: Element|any, directive: Directive): Method {
        return new Method(elt, ActionType.METHOD, {
            method: directive.method,
            params: directive.params,
        });
    }
}
