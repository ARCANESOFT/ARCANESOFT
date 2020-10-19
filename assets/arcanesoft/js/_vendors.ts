import './vendors/lodash'
import './vendors/popper'
import './vendors/twitter-bootstrap'

// Moment
//-----------------------

window['moment'] = require('moment-timezone')

// TuiEditor
//-----------------------

window['TuiEditor'] = require('@toast-ui/editor')

// Plugins Container
//----------------------------------------

import chart from './vendors/chart-js'
import flatpickr from './vendors/flatpickr'
import select2 from './vendors/select2'
import autosize from './vendors/autosize'

window['plugins'] = {
    chart,
    flatpickr,
    select2,
    autosize,
}
