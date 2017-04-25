/**
 * Register Vue components...
 */
import Vue from 'vue';

if ( ! window.eventHub) {
    window.eventHub = new Vue;
}

Vue.component('media-manager',       require('./MediaManager.vue'));
Vue.component('media-browser',       require('./MediaBrowser.vue'));
Vue.component('media-browser-modal', require('./Modals/BrowseMediaModal.vue'));
