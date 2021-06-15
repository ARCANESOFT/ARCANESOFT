/**
 * @link https://github.com/flatpickr/flatpickr
 */

import flatpickr from 'flatpickr'
import arcanesoft from '../helpers/arcanesoft'
import fpLanguages from '../translations/vendors/flatpickr'

export default (selector: string, options?: Object) => {
    options = Object.assign({}, options, {
        locale: fpLanguages[options['locale'] || arcanesoft().getLocale()]
    })

    return flatpickr(selector, options)
}
