import { App } from '@vue/runtime-core'

import MediaManager from './components/MediaManager'
import MediaBrowser from './components/MediaBrowser'

export default {
    install: (app: App): void  => {
        app.component('v-media-manager', MediaManager)
        app.component('v-media-browser', MediaBrowser)
    }
}
