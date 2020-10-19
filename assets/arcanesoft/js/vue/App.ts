import { createApp, onMounted } from 'vue'

import plugins from './plugins'
import components from './components'

// Creating the Vue App

const app = createApp({
    setup() {
        onMounted(() => {
            // _this.initComponents(document)
        })

        function logout(url: string) {
            window['request']()
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

app.config.isCustomElement = tag => tag.startsWith('x-')

// Plugins

plugins.forEach(plugin => app.use(plugin))

// Components

for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
}

export default app
