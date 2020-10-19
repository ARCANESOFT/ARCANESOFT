import { createApp } from 'vue'

import mixins from '../mixins'

const app = createApp({
    mixins,

    setup() {
        function logout(url: string) {
            this.request()
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
            logout
        }
    },
})

import components from './components'

for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
}

export default app
