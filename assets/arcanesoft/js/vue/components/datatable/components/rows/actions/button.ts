import { defineComponent, ref, onMounted, onBeforeUnmount, PropType} from 'vue'
import { DatatableRowAction } from '../../../types'
import useTooltip from '../../../../../../components/tooltip'
import computedAction from './_shared/computed-action'

export default defineComponent({
    name: 'v-datatable-row-button-action',

    props: {
        action: {
            type: Object as PropType<DatatableRowAction>,
            required: true,
        },
    },

    setup({ action }) {
        const actionRef = ref<HTMLElement>(null)
        let tooltip = null

        const { onlyIcon, isDisabled, isDestructive } = computedAction(action)

        onMounted(() => {
            tooltip = useTooltip(actionRef.value)
        })

        onBeforeUnmount(() => {
            tooltip.dispose()
        })

        return {
            actionRef,
            onlyIcon,
            isDisabled,
            isDestructive,
        }
    },

    template: `
        <button ref="actionRef"
                :onclick="action.allowed ? action.action : null"
                :title="action.label"
                :data-original-title="action.label"
                :data-toggle="onlyIcon ? 'tooltip' : null"
                :ariaDisabled="isDisabled ? 'true' : null"
                class="v-datatable-row-action" :class="{ 'destructive': isDestructive, 'disabled': isDisabled }">
            <i v-if="onlyIcon" :class="action.icon"></i>
            <span v-else>{{ action.label }}</span>
        </button>
    `,
})
