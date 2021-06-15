// import { Toast } from 'bootstrap/dist/js/bootstrap.esm'
import Toast from 'bootstrap/js/src/toast'

export default (elt: HTMLElement, config?: Object) => new Toast(elt, config || {})
