import { defineComponent, onMounted, ref, computed } from 'vue'
import request from '../../../../mixins/request'
import arcanesoft from '../../../../helpers/arcanesoft'

const EVENT_CLASS = 'Arcanesoft\\Foundation\\Core\\Events\\UI\\SkinModeToggled'

enum SKIN_MODE {
    DARK = 'dark',
    LIGHT = 'light',
}

export default defineComponent({
    name: 'v-skin-mode-toggler',

    setup() {
        const selected = ref(null)

        onMounted((): void => {
            selected.value = document.body.dataset.skinMode || SKIN_MODE.LIGHT
        })

        function toggle(): void {
            selected.value = (selected.value === SKIN_MODE.LIGHT) ? SKIN_MODE.DARK : SKIN_MODE.LIGHT

            save()
        }

        function save(): void {
            const mode = selected.value

            document.body.dataset.skinMode = mode

            request().post('/admin/api/events', {
                class: EVENT_CLASS,
                options: {mode},
            }).then()

            arcanesoft().$emit('foundation.ui.skin', {mode})
        }

        return {
            selected,
            toggle,
            iconClass: computed(
                (): string => selected.value === SKIN_MODE.DARK ? 'far fa-fw fa-sun' : 'far fa-fw fa-moon'
            ),
        }
    },

    template: `
        <a class="navbar-link-item navbar-link-icon" @click.prevent="toggle">
            <i :class="iconClass"></i>
        </a>
    `,
})
