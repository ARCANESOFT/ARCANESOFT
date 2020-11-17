import { Toast } from 'bootstrap/js/index.esm'

export default (elt: HTMLElement, config?: Object) => new Toast(elt, config || {})
