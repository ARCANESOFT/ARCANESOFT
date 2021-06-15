import { App } from '@vue/runtime-core'
import { stateSymbol, createState } from './store/state'
import MediaManager from './components/media-manager'
import MediaBrowser from './components/media-browser'

export default {
    install: (app: App): void  => {
        app.provide(stateSymbol, createState())

        app.component(MediaManager.name, MediaManager)
        app.component(MediaBrowser.name, MediaBrowser)
    }
}
