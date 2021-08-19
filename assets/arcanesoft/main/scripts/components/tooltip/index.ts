import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm'

export default (element: HTMLElement, config?: Object) => new Tooltip(element, {
    ...{ boundary: 'window' },
    ...( config || {} ),
})
