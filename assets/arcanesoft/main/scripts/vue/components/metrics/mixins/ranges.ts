import { computed, ref } from 'vue'
import Metric from '../types/metric'
import MetricRange from '../types/metric-range'

export default (metric: Metric) => {
    const ranges = ref<Array<MetricRange>>(metric.ranges || [])
    const hasRanges = computed<boolean>((): boolean => ranges.value.length > 0)
    const selectedRange = ref<number|null>(hasRanges.value ? ranges.value[0].value : null)

    const isRangeSelected = (value): boolean => selectedRange.value === value

    return {
        ranges,
        hasRanges,
        selectedRange,
        isRangeSelected,
    }
}
