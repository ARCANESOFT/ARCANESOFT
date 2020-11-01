import { defineComponent, PropType } from 'vue'
import displayMode from '../../store/modules/display-mode'
import { trans } from '../../helpers/translator'
import { DisplayMode } from '../../types'

export default defineComponent({
    name: 'v-display-mode-button',

    props: {
        mode: {
            type: Object as PropType<DisplayMode>,
            required: true,
        },
    },

    setup(props) {
        const { isSelected: isSelectedMode, setSelected: setSelectedDisplayMode } = displayMode()

        const isSelected = isSelectedMode(props.mode.key)

        function changeDisplayMode(): void {
            if ( ! isSelected.value)
                setSelectedDisplayMode(props.mode.key)
        }

        return {
            trans,
            isSelected,
            changeDisplayMode,
        }
    },

    template: `
        <button @click.prevent="changeDisplayMode" :title="trans(mode.title)" type="button"
            class="display-mode btn btn-outline-secondary" :class="{'active': isSelected}">
            <i :class="mode.icon"></i>
        </button>
    `,
})
