import { defineComponent, computed, PropType} from 'vue'
import { DatatableRowAction } from '../../../../types'

import ButtonAction from './button'
import LinkAction from './link'

export default defineComponent({
    name: 'v-datatable-row-action',

    props: {
        action: {
            type: Object as PropType<DatatableRowAction>,
            required: true,
        },
    },

    components: {
        ButtonAction,
        LinkAction,
    },

    setup({ action }) {
        const isButton = computed<boolean>(() => action.type === 'button')
        const isLink = computed<boolean>(() => action.type === 'link')

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
