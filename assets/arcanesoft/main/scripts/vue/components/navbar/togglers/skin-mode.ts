import { computed, defineComponent } from 'vue'
import skinMode from '../../../store/modules/skin-mode'

export default defineComponent({
    name: 'v-skin-mode-toggler',

    setup() {
        const { isDarkMode, toggleMode } = skinMode()

        const iconClass = computed(
            (): string => isDarkMode.value ? 'far fa-fw fa-sun' : 'far fa-fw fa-moon'
        )

        return {
            toggleMode,
            iconClass,
        }
    },

    template: `
        <a @click.prevent="toggleMode" class="navbar-link-item navbar-link-icon">
            <i :class="iconClass"></i>
        </a>
    `,
})
