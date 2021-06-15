import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { DatatypeAction } from '../../../../types/column-datatype'
import useTooltip from '../../../../../../../components/tooltip'

export default defineComponent({
    name: 'v-dt-datatype-action-button',

    props: {
        action: {
            type: Object as PropType<DatatypeAction>,
            required: true,
        },
    },

    setup(props, ctx) {
        const actionRef = ref<HTMLElement>(null)
        let tooltip = null

        const onlyIcon = computed<boolean>(() => props.action.icon !== null)
        const isDisabled =  computed<boolean>(() => props.action.allowed === false)
        const isDestructive =  computed<boolean>(() => props.action.name === 'delete')

        const actionClass = computed<Object>(() => ({
            'destructive': isDestructive.value,
            'text-danger': isDestructive.value,
            'disabled': isDisabled.value,
        }))

        onMounted(() => {
            tooltip = useTooltip(actionRef.value, { container: 'body' })
        })

        return {
            actionRef,
            onlyIcon,
            isDisabled,
            actionClass,
        }
    },

    template: `
        <button ref="actionRef"
                :onclick="action.allowed ? action.action : null"
                :title="action.label"
                :data-original-title="action.label"
                :data-bs-toggle="onlyIcon ? 'tooltip' : null"
                :data-container="onlyIcon ? 'body' : null"
                :ariaDisabled="isDisabled ? 'true' : null"
                class="v-dt-datatype-action" :class="actionClass">
            <i v-if="onlyIcon" :class="action.icon"></i>
            <span v-else>{{ action.label }}</span>
        </button>
    `,
})
