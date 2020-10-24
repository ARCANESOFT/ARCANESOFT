import { App } from '@vue/runtime-core'

import MediaManager from './components/media-manager'
import MediaBrowser from './components/media-browser'

export default {
    install: (app: App): void  => {
        app.component(`${MediaManager.name}`, MediaManager)
        app.component(`${MediaBrowser.name}`, MediaBrowser)
    }
}
