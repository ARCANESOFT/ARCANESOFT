import datatable from '../vue/components/wire/helpers/datatable'
import form from './form'
import modal from './modal'
import loadingButton from './buttons/loading-button'

window['components'] = {
    datatable,
    form,
    modal,
    loadingButton,
}

export default () => window['components']
