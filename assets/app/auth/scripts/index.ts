import { App } from 'vue'
import components from './vue/components'
import pages from './vue/pages'

export default {
    install: (app: App): void  => {
        // Components
        components.forEach((component) => {
            app.component(component.name, component);
        })

        // Pages
        pages.forEach((page) => {
            app.component(page.name, page);
        })
    }
}
