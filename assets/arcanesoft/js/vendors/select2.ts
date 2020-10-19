import arcanesoft from "../helpers/arcanesoft"
window['$'] = window['jQuery'] = require('jquery')
require('select2')

export default (selector: string, options?: Object) => {
    const defaultOptions = {
        language: arcanesoft().getLocale(),
        theme: 'arcanesoft',
    }

    window['$'](selector).select2(
        Object.assign({}, defaultOptions, options)
    )
}
