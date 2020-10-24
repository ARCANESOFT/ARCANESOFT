import { defineComponent, ref, computed } from 'vue'
import arcanesoft from '../../../../helpers/arcanesoft'
import sf from 'screenfull'

export default defineComponent({
    name: 'v-fullscreen-toggler',

    setup() {
        const isFullscreen = ref(false)

        function toggle(): void {
            if ( ! sf.isEnabled)
                return

            sf.toggle().then(() => {
                isFullscreen.value = (sf as sf.Screenfull).isFullscreen

                arcanesoft().emit('foundation.ui.fullscreen', {
                    isFullscreen: isFullscreen.value
                })
            })
        }

        const iconClass = computed((): string => {
            return isFullscreen.value ? 'fa fa-fw fa-compress' : 'fa fa-fw fa-expand'
        })

        return {
            isFullscreen,
            toggle,
            iconClass,
        }
    },

    template: `
        <a @click.prevent="toggle"
           class="navbar-link-item navbar-link-icon"><i :class="iconClass"></i></a>
    `,
})
