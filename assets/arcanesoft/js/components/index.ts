import { form } from './form'
import { modal } from './modal'
import { loadingButton } from './buttons/loading-button'

const components = {
    form,
    modal,
    loadingButton,
}

window['components'] = components

export default () => components
