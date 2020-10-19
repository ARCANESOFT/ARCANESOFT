import { defineComponent, computed, PropType } from 'vue'
import { ComputedRef } from '@vue/reactivity'
import { MetricTrendResult, MetricTrendValue } from '../types/metric-result'
import Chart from './chart'

export default defineComponent({
    name: 'v-trend-metric',

    props: {
        result: {
            type: Object as PropType<MetricTrendResult>,
            required: true,
        },
    },

    components: {
        Chart,
    },

    setup(props) {
        const trend = computed((): any => Object.values(props.result.trend))
        const computedItems = (cb: (item: MetricTrendValue) => any): ComputedRef<Array<any>> => {
            return computed<Array<any>>((): Array<any> => trend.value.map(cb))
        }

        const trendValues = computedItems((item: MetricTrendValue): number => item.value)
        const trendLabels = computedItems((item: MetricTrendValue): string => item.label)

        return {
            trendValues,
            trendLabels,
        }
    },

    template: `
        <h3 class="mb-0" v-if="result.value !== null">{{ result.value.value }}</h3>

        <Chart :data="trendValues" :labels="trendLabels"/>
    `,
})
