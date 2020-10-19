// https://github.com/flatpickr/flatpickr

import flatpickr from 'flatpickr'
import fpLanguages from '../lang/plugins/flatpickr'

export default (selector: string, options?: Object) => {
    options = window['_'].merge(options, {
        locale: fpLanguages[options["locale"] || window['Foundation'].getLocale()]
    })

    return flatpickr(selector, options)
}
