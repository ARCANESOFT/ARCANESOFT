// import './lodash'
import './request'
import './popper'
import './twitter-bootstrap'

// Moment
//-----------------------

window['moment'] = require('moment-timezone')

// TuiEditor
//-----------------------

window['TuiEditor'] = require('@toast-ui/editor')

// Plugins Container
//----------------------------------------

import chart from './chart-js'
import flatpickr from './flatpickr'
import select2 from './select2'
import autosize from './autosize'

window['plugins'] = {
    chart,
    flatpickr,
    select2,
    autosize,
}
