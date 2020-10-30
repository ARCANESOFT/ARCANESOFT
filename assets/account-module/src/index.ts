import { App } from '@vue/runtime-core'
import pages from './vue/pages'

export default {
    install: (app: App): void  => {
        // Pages
        pages.forEach((page) => {
            app.component(page.name, page);
        })
    }
}
