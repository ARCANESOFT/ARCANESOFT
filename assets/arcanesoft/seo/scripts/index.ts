import { App } from '@vue/runtime-core'
import FooterPlaceholders from './components/footers/footer-placeholders'

export default {
    install: (app: App): void  => {
        app.component(FooterPlaceholders.name, FooterPlaceholders)
    }
}
