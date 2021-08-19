import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { DatatableRowColumn } from '../../../../types'
import { DatatypeStatus } from '../../../../types/column-datatype'
import useTooltip from '../../../../../../../components/tooltip'

export default defineComponent({
    name: 'v-dt-row-col-plain',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    setup(props) {
        let tooltip = null
        const statusRef = ref<HTMLElement>(null)

        const status = computed<DatatypeStatus>(() => <DatatypeStatus> props.rowColumn.value)

        const statusAttributes = computed(() => ({
            'class':               `status bg-${status.value.type}`,
            'title':               status.value.label,
            'data-toggle':         'tooltip',
            'data-original-title': status.value.label,
            'data-container':      'body',
        }))

        onMounted(() => {
            tooltip = useTooltip(statusRef.value, { container: 'body' })
        })

        return {
            statusRef,
            statusAttributes,
        }
    },

    template: `
        <span ref="statusRef" v-bind="statusAttributes"></span>
    `,
})
