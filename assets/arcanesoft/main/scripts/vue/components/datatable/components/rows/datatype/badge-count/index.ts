import { defineComponent, ref, onMounted, computed, PropType } from 'vue'
import { DatatableRowColumn } from '../../../../types'
import { DatatypeBadgeCount } from '../../../../types/column-datatype'
import useTooltip from '../../../../../../../components/tooltip'

export default defineComponent({
    name: 'v-dt-row-col-badge-count',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    setup(props) {
        let tooltip = null
        const badgeRef = ref<HTMLElement>(null)

        const badge = computed(() => <DatatypeBadgeCount> props.rowColumn.value)

        const badgeAttributes = computed(() => ({
            'class':               badge.value.count > 0 ? 'border-info' : (badge.value.count < 0 ? 'border-danger' : 'border-secondary'),
            'title':               badge.value.label,
            'data-toggle':         badge.value.label ? 'tooltip' : null,
            'data-original-title': badge.value.label,
            'data-container':      badge.value.label ? 'body' : null,
        }))

        onMounted(() => {
            tooltip = useTooltip(badgeRef.value, { container: 'body' })
        })

        return {
            badge,
            badgeRef,
            badgeAttributes,
        }
    },

    template: `
        <span ref="badgeRef"
              class="badge border rounded-pill text-muted"
              v-bind="badgeAttributes"
              v-text="badge.count"></span>
    `,
})
