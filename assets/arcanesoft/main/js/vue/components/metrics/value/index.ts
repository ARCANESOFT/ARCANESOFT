import { defineComponent, computed, PropType } from 'vue'
import { MetricValueResult } from '../types/metric-result'
import numeral from 'numeral'

export default defineComponent({
    name: 'v-value-metric',

    props: {
        result: {
            type: Object as PropType<MetricValueResult>,
            required: true,
        },
    },

    setup(props) {
        const formattedValue = computed((): string => {
            if (props.result.value === null)
                return ''

            return (props.result.prefix || '') + numeral(props.result.value).format(props.result.format)
        })

        return {
            formattedValue,
        }
    },

    template: `
        <h3 class="mb-0">{{ formattedValue }}</h3>
    `,
})
