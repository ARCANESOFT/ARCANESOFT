import { createApp } from 'vue'
import request from '../helpers/request'

// Creating the Vue App
const app = createApp({
    setup() {
        const logout = (url: string): void => {
            request()
                .delete(url)
                .then((response) => response.data.redirect)
                .then((redirectUrl) => {
                    location.replace(redirectUrl)
                })
                .catch(() => {
                    location.reload()
                })
        }

        return {
            logout,
        }
    }
})

// Config
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('x-')

// Plugins
import plugins from './plugins'

plugins.forEach((plugin) => {
    app.use(plugin)
})

// Components
import components from './components'

components.forEach((component) => {
    app.component(`${component.name}`, component)
})

export default app
