import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { DatatypeAction } from '../../../../types/column-datatype'
import useTooltip from '../../../../../../../components/tooltip'

export default defineComponent({
    name: 'v-dt-row-link-action',

    props: {
        action: {
            type: Object as PropType<DatatypeAction>,
            required: true,
        },
    },

    setup(props) {
        const actionRef = ref<HTMLElement>(null)
        let tooltip = null

        const onlyIcon = computed<boolean>(() => props.action.icon !== null)
        const isDisabled =  computed<boolean>(() => props.action.allowed === false)
        const isDestructive =  computed<boolean>(() => props.action.name === 'delete')

        onMounted(() => {
            tooltip = useTooltip(actionRef.value, { container: 'body' })
        })

        return {
            actionRef,
            onlyIcon,
            isDisabled,
            isDestructive,
        }
    },

    template: `
        <a ref="actionRef"
           :href="action.allowed ? action.action : '#'"
           :title="action.label"
           :data-original-title="action.label"
           :data-toggle="onlyIcon ? 'tooltip' : null"
           :data-container="onlyIcon ? 'body' : null"
           :ariaDisabled="isDisabled ? 'true' : null"
           class="v-dt-datatype-action" :class="{ 'destructive': isDestructive, 'disabled': isDisabled }">
            <i v-if="onlyIcon" :class="action.icon"></i>
            <span v-else>{{ action.label }}</span>
        </a>
    `,
})
