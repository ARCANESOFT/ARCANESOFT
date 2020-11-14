import { Tooltip } from 'bootstrap/js/index.esm'

export default (element: HTMLElement, config?: Object) => new Tooltip(element, {
    ...{ boundary: 'window' },
    ...( config || {} ),
})
