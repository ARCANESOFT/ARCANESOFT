// import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm'
import Tooltip from 'bootstrap/js/src/tooltip'

export default (element: HTMLElement, config?: Object) => new Tooltip(element, {
    ...{ boundary: 'window' },
    ...( config || {} ),
})
