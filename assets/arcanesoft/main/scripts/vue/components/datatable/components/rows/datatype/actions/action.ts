import { defineComponent, computed, PropType } from 'vue'
import { DatatypeAction } from '../../../../types/column-datatype'

import ButtonAction from './button'
import LinkAction from './link'

export default defineComponent({
    name: 'v-dt-datatype-action',

    props: {
        action: {
            type: Object as PropType<DatatypeAction>,
            required: true,
        },
    },

    components: {
        ButtonAction,
        LinkAction,
    },

    setup(props) {
        const isButton = computed<boolean>(() => props.action.type === 'button')
        const isLink = computed<boolean>(() => props.action.type === 'link')

        return {
            isButton,
            isLink,
        }
    },

    template: `
        <ButtonAction v-if="isButton" :action="action"/>
        <LinkAction v-if="isLink" :action="action"/>
    `,
})
