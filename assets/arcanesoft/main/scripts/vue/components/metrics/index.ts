import { defineComponent, onMounted, computed, PropType } from 'vue'
import { ComputedRef } from '@vue/reactivity'
import Metric from './types/metric'
import { MetricResult } from './types/metric-result'
import MetricType from './enums/metric-type'
import api from './mixins/api'
import metricRanges from './mixins/ranges'

import PartitionMetric from './partition'
import RangedValueMetric from './ranged-value'
import TrendMetric from './trend'
import ValueMetric from './value'

export default defineComponent({
    name: 'v-metric',

    props: {
        metric: {
            type: Object as PropType<Metric>,
            required: true,
        },
    },

    components: {
        PartitionMetric,
        RangedValueMetric,
        TrendMetric,
        ValueMetric,
    },

    setup(props) {
        const { fetch, result, isLoading, isAllowed, isReady } = api()
        const { ranges, hasRanges, selectedRange, isRangeSelected } = metricRanges(props.metric)

        function loadMetric(): Promise<MetricResult> {
            const params = {}

            if (hasRanges.value)
                params['range'] = selectedRange.value

            return fetch(props.metric.class, params)
        }

        onMounted(async (): Promise<void> => {
            await loadMetric()
        })

        const changeSelectedRange = async (event): Promise<void> => {
            selectedRange.value = parseInt(event.target.value, 10)
            await loadMetric()
        }

        const isMetricType = (type: MetricType): ComputedRef<boolean> => computed<boolean>(
            () => isReady.value && props.metric.type === type
        )

        return {
            result,
            isLoading,
            isAllowed,
            isReady,

            hasRanges,
            ranges,
            selectedRange,
            isRangeSelected,

            changeSelectedRange,

            isRangedValueMetric: isMetricType(MetricType.RANGED_VALUE),
            isPartitionMetric: isMetricType(MetricType.PARTITION),
            isTrendMetric: isMetricType(MetricType.TREND),
            isValueMetric: isMetricType(MetricType.VALUE),
        }
    },

    template: `
        <div class="card card-borderless shadow-sm position-relative" :class="{'card-loading': isLoading}">
            <div v-if="isLoading" class="loading-overlay">
                <div class="flashing-dots"></div>
            </div>

            <div v-else-if=" ! isAllowed" class="card-locked">
                <i class="fas fa-3x fa-lock"></i>
            </div>

            <h6 class="card-header fw-semibold text-muted p-3">{{ metric.title }}</h6>

            <PartitionMetric v-if="isPartitionMetric" :result="result"/>
            <RangedValueMetric v-if="isRangedValueMetric" :result="result"/>
            <TrendMetric v-if="isTrendMetric" :result="result"/>
            <ValueMetric v-if="isValueMetric" :result="result"/>

            <div v-if="hasRanges && isReady" class="card-footer p-2">
                <select class="form-select form-control-xs" @change="changeSelectedRange">
                    <option v-for="range in ranges" :key="range.value"
                            :value="range.value" :selected="isRangeSelected(range.value)">{{ range.label }}</option>
                </select>
            </div>
        </div>
    `
})
