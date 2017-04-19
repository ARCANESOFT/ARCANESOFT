/**
 * Required the basic libraries
 */
window._ = require('lodash');

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap-sass');
} catch (e) {}

/**
 * Setup
 */
window.App = {
    csrfToken: document.head.querySelector("meta[name=csrf-token]").content
};

// AXIOS
window.axios = require('axios');
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.App.csrfToken;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// VUE JS
window.Vue   = require('vue');
window.eventHub = new Vue;

/**
 * Laravel Echo
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
