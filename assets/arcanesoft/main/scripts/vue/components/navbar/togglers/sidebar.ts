import { defineComponent } from 'vue'
import arcanesoft from '../../../../helpers/arcanesoft'
import tap from "@arcanesoft/core/src/functions/tap"

const EVENT_CLASS = 'Arcanesoft\\Foundation\\Core\\Events\\UI\\SidebarToggled'

export default defineComponent({
    name: 'v-sidebar-toggler',

    setup() {
        function toggle(): void {
            let visible = document.body.dataset.sidebarVisible || 'true'

            save(visible === 'true' ? 'false' : "true")
        }

        function save(visible: string): void {
            document.body.dataset.sidebarVisible = visible

            tap(arcanesoft(), (arcanesoft) => {
                arcanesoft.request().post('/admin/api/events', {
                    class: EVENT_CLASS,
                    options: {visible},
                }).then()

                arcanesoft.emit('foundation.ui.sidebar', {visible})
            })
        }

        return {
            toggle,
        }
    },

    template: `
        <a @click.prevent="toggle" class="navbar-link-item navbar-link-icon">
            <i class="fas fa-fw fa-bars"></i>
        </a>
    `,
})
