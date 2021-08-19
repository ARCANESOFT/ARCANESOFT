import { computed, defineComponent, inject } from 'vue'
import { onLeftClick } from '../utilities'

import SingleValue from './single-value'
import MultiValue from './multiple-value'
import ArrowIcon from './icons/arrow'
import DeleteIcon from './icons/delete'

export default defineComponent({
    name: 'v-treeselect-control',

    components: {
        SingleValue,
        MultiValue,
        ArrowIcon,
        DeleteIcon,
    },

    setup() {
        const { props, getters, data } = inject('treeselect')

        const closeTitle = computed((): string => getters.isMultiple ? props.clearAllText : props.clearValueText)

        const handleMouseDown = () => {
            //
        }

        const handleMouseDownOnClose = () => {
            //
        }

        const focusInput = () => {
            //
        }

        const toggleMenu = (): void => {
            data.menu.isOpen = ! data.menu.isOpen
        }

        const handleMouseDownOnArrow = onLeftClick(() => {
            focusInput()
            toggleMenu()
        })

        const shouldShowArrowIcon = computed((): boolean => {
            if ( ! props.alwaysOpen)
                return true

            // Even with `alwaysOpen: true`, sometimes the menu is still closed,
            // e.g. when the control is disabled.
            return ! data.menu.isOpen
        })


        return {
            closeTitle,
            handleMouseDown,
            handleMouseDownOnClose,
            handleMouseDownOnArrow,
            isSingle: getters.isSingle,
            isMultiple: getters.isMultiple,
            shouldShowCloseIcon: getters.shouldShowCloseIcon,
            shouldShowArrowIcon,
            menu: data.menu,
        }
    },

    template: `
        <div class="v-treeselect-control" @mousedown.prevent="handleMouseDown">
            <SingleValue v-if="isSingle"/>
            <MultiValue v-if="isMultiple"/>

            <div v-if="shouldShowCloseIcon" @mousedown.prevent="handleMouseDownOnClose"
                 :title="closeTitle" class="v-treeselect-control-close-wrapper">
                <DeleteIcon class="v-treeselect-control-close"/>
            </div>

            <div v-if="shouldShowArrowIcon" @onmousedown.prevent.stop="handleMouseDownOnArrow"
                class="v-treeselect-control-arrow-wrapper">
                <ArrowIcon class="v-treeselect-control-arrow"
                           :class="{'v-treeselect-control-arrow--rotated': menu.isOpen}"/>
            </div>
        </div>
    `,
})
