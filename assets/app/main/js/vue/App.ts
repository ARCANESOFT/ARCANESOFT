import { createApp } from 'vue'
import auth from '@app/auth/src/functions'

const app = createApp({
    setup() {
        const { logout } = auth()

        return {
            logout,
        }
    },
})

// Plugins
import plugins from './plugins'

plugins.forEach((plugin) => {
    app.use(plugin)
})

// Components
import components from './components'

components.forEach((component) => {
    app.component(component.name, component);
})

export default app
