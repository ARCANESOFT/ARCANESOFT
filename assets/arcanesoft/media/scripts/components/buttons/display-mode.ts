import { defineComponent, PropType } from 'vue'
import { DisplayMode } from '../../types'
import { useHelpers, useMutations } from '../../store'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-display-mode-button',

    props: {
        mode: {
            type: Object as PropType<DisplayMode>,
            required: true,
        },
    },

    setup(props) {
        const { setSelectedDisplayMode } = useMutations()
        const { isDisplayModeSelected } = useHelpers()

        const isSelected = isDisplayModeSelected(props.mode.key)

        const onClick = (): void => {
            if ( ! isSelected.value)
                setSelectedDisplayMode(props.mode.key)
        }

        return {
            trans,
            isSelected,
            onClick,
        }
    },

    template: `
        <button @click.prevent="onClick" :title="trans(mode.title)" type="button"
            class="display-mode btn btn-outline-secondary" :class="{'active': isSelected}">
            <i :class="mode.icon"></i>
        </button>
    `,
})
