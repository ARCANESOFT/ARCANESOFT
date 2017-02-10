/**
 * Required the basic libraries
 */
window._     = require('lodash');
window.$     = window.jQuery = require('jquery');
window.Vue   = require('vue');
window.axios = require('axios');

require('bootstrap-sass');

/**
 * Setup
 */
window.App = {
    csrfToken: document.head.querySelector("meta[name=csrf-token]").content
};

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.App.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

/**
 * Laravel Echo
 */

// import Echo from "laravel-echo"

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
