import datatable from './datatable'
import form from './form'
import modal from './modal'
import toast from './toast'
import tooltip from './tooltip'
import loadingButton from './buttons/loading-button'

const components = {
    datatable,
    form,
    modal,
    toast,
    tooltip,
    loadingButton,
}

window['components'] = components

export default () => components
