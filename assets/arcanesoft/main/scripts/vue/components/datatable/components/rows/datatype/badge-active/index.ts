import { defineComponent, ref, computed, onMounted, PropType } from 'vue'
import { DatatableRowColumn } from '../../../../types'
import { DatatypeBadgeActive } from "../../../../types/column-datatype"
import useTooltip from '../../../../../../../components/tooltip'

export default defineComponent({
    name: 'v-dt-row-col-badge-active',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    setup(props) {
        let tooltip = null
        const badgeRef = ref<HTMLElement>(null)

        const badge = computed<DatatypeBadgeActive>(() => <DatatypeBadgeActive> props.rowColumn.value)

        const badgeAttributes = computed(() => ({
            'class':               badge.value.active ? 'border-success text-success' : 'border-secondary text-secondary',
            'title':               badge.value.icon ? badge.value.label : null,
            'data-toggle':         badge.value.icon ? 'tooltip' : null,
            'data-original-title': badge.value.icon ? badge.value.label : null,
            'data-container':      badge.value.icon  ? 'body' : null,
        }))

        const iconAttributes = computed(() => ({
            'class': badge.value.active ? 'fa fa-fw fa-check' : 'fa fa-fw fa-ban'
        }))

        onMounted(() => {
            tooltip = useTooltip(badgeRef.value, { container: 'body' })
        })

        return {
            badge,
            badgeRef,
            badgeAttributes,
            iconAttributes,
        }
    },

    template: `
        <span ref="badgeRef"
              class="badge border text-muted"
              v-bind="badgeAttributes">
            <i v-if="badge.icon" v-bind="iconAttributes"></i>
        </span>
    `,
})
