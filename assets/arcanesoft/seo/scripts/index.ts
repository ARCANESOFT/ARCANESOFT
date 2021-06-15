import { App } from '@vue/runtime-core'
import FooterPlaceholders from './components/footers/footer-placeholders'
import Metas from './components/metas'

export default {
    install: (app: App): void  => {
        app.component(FooterPlaceholders.name, FooterPlaceholders)
        app.component(Metas.name, Metas)
    }
}
