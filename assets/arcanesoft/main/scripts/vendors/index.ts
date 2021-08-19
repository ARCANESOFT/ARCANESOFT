import './lodash'
import './request'
import './popper'
import './twitter-bootstrap'

// Moment
//-----------------------

window['moment'] = require('moment-timezone')

// Plugins Container
//----------------------------------------

import chart from './chart-js'
import flatpickr from './flatpickr'
import autosize from './autosize'

window['plugins'] = {
    autosize,
    chart,
    flatpickr,
}
