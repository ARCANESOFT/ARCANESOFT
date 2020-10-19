import './_components'
import './_vendors'
import './_helpers'

/**
 * Init the APP
 */

import Arcanesoft from './classes/Arcanesoft'

window['Foundation'] = new Arcanesoft({
    rootContainer: '#arcanesoft',
})
