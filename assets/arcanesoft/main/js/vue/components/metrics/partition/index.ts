import { defineComponent, computed, PropType } from 'vue'
import { ComputedRef } from '@vue/reactivity'
import { MetricPartitionResult, MetricPartitionValue } from '../types/metric-result'
import Chart from './chart'
import color from '../mixins/color'

type FormattedValue = {
    label: string
    value: number
    color: string
}

export default defineComponent({
    name: 'v-partition-metric',

    props: {
        result: {
            type: Object as PropType<MetricPartitionResult>,
            required: true,
        },
    },

    components: {
        Chart,
    },

    setup(props) {
        function computedItems(cb: (item: MetricPartitionValue, index: number) => any): ComputedRef<Array<any>> {
            return computed(() => props.result.value.map(cb))
        }

        const values = computedItems((item: MetricPartitionValue) => item.value)
        const labels = computedItems((item: MetricPartitionValue) => item.label)
        const colors = computedItems((item: MetricPartitionValue, index) => color.get(item, color.getByIndex(index)))
        const formattedItems = computedItems((item: MetricPartitionValue, index): FormattedValue => ({
            label: item.label,
            value: item.value,
            color: color.get(item, color.getByIndex(index)),
        }))

        return {
            values,
            labels,
            colors,

            isEmpty: computed(() => values.value && values.value.length < 1),
            formattedItems,
        }
    },

    template: `
        <div v-if="isEmpty">No data</div>

        <div v-else class="d-flex justify-content-between flex-nowrap">
            <ul class="list-unstyled mb-0">
                <li v-for="item in formattedItems">
                    <span class="status mr-1" :style="['background-color:'+item.color]"></span>
                    <small>{{ item.label }} ({{ item.value }})</small>
                </li>
            </ul>

            <div class="position-relative" style="max-height: 100px; width: 100px;">
                <Chart :data="values" :labels="labels" :colors="colors"/>
            </div>
        </div>
    `,
})
