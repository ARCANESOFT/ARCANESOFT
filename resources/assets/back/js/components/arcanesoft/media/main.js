import Vue from 'vue';

if ( ! window.eventHub) {
    window.eventHub = new Vue();
}

/**
 * Register Vue components...
 */
Vue.component('media-manager', require('./MediaManager.vue'));
Vue.component('media-browser', require('./MediaBrowser.vue'));
