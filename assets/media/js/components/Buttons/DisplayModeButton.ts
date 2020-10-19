import { defineComponent, computed, PropType } from 'vue'
import currentDisplayMode from '../../store/getters/display-mode/current-display-mode'
import mutations from '../../store/mutations'
import translator from '../../mixins/translator'
import { DisplayMode } from '../../types'

export default defineComponent({
    name: 'v-display-mode-button',

    mixins: [
        translator,
    ],

    props: {
        mode: {
            type: Object as PropType<DisplayMode>,
            required: true,
        },
    },

    setup(props) {
        const selected = computed((): boolean => props.mode.key === currentDisplayMode())

        function changeDisplayMode(): void {
            if ( ! selected.value)
                mutations.setDisplayMode(props.mode.key)
        }

        return {
            selected,
            changeDisplayMode,
        }
    },

    template: `
        <button @click.prevent="changeDisplayMode" :title="trans(mode.title)" type="button"
            class="display-mode btn btn-light" :class="{'active': selected}">
            <i :class="mode.icon"></i>
        </button>
    `,
})
