import { defineComponent, computed, PropType } from 'vue'
import { ComputedRef } from '@vue/reactivity'
import { MetricRangedValueResult } from '../types/metric-result'
import numeral from 'numeral'

enum GrowthStatus {
    CONSTANT  = 'Constant',
    DECREASED = 'Decreased',
    INCREASED = 'Increased',
}

export default defineComponent({
    name: 'v-ranged-value-metric',

    props: {
        result: {
            type: Object as PropType<MetricRangedValueResult>,
            required: true,
        },
    },

    setup(props) {
        const currentValue = props.result.value
        const previousValue = props.result.previous.value

        const growth = computed<number>((): number => {
            let growth;

            if (currentValue !== 0)
                growth = previousValue === 0
                    ? currentValue
                    : (currentValue - previousValue) / previousValue
            else
                growth = - previousValue

            return Math.floor(growth * 100)
        })

        const growthStatus = computed<GrowthStatus>((): GrowthStatus => {
            switch (Math.sign(growth.value)) {
                case 1:
                    return GrowthStatus.INCREASED
                case 0:
                    return GrowthStatus.CONSTANT
                case -1:
                    return GrowthStatus.DECREASED
            }
        })

        const constantGrowthMessage = computed<string>((): string => {
            if (previousValue !== 0 && currentValue !== 0)
                return 'No Increase'

            return 'No data'
        })

        const checkGrowth = (status: GrowthStatus): ComputedRef<boolean> => {
            return computed<boolean>((): boolean => growthStatus.value === status)
        }

        return {
            growth,
            constantGrowthMessage,

            hasIncreased: checkGrowth(GrowthStatus.INCREASED),
            hasDecreased: checkGrowth(GrowthStatus.DECREASED),
            isConstant: checkGrowth(GrowthStatus.CONSTANT),

            formattedValue: computed<string>((): string => {
                if (props.result.value === null)
                    return ''

                const prefix = props.result.prefix || ''
                const value = numeral(props.result.value).format(props.result.format || '(0[.]00a)')

                return `${prefix}${value}`
            }),
        }
    },

    template: `
        <div class="card-body p-3">
            <h3 class="mb-0">{{ formattedValue }}</h3>

            <svg v-if="hasIncreased" class="metric-value-icon metric-value-increased" viewBox="0 0 24 24">
                <path d="M20 15a1 1 0 0 0 2 0V7a1 1 0 0 0-1-1h-8a1 1 0 0 0 0 2h5.59L13 13.59l-3.3-3.3a1 1 0 0 0-1.4 0l-6 6a1 1 0 0 0 1.4 1.42L9 12.4l3.3 3.3a1 1 0 0 0 1.4 0L20 9.4V15z"></path>
            </svg>
            <svg v-else-if="hasDecreased" class="metric-value-icon metric-value-decreased" viewBox="0 0 24 24">
                <path d="M20 9a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1h-8a1 1 0 0 1 0-2h5.59L13 10.41l-3.3 3.3a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 1.4-1.42L9 11.6l3.3-3.3a1 1 0 0 1 1.4 0l6.3 6.3V9z"></path>
            </svg>
            <span v-else-if="isConstant" class="fw-semibold text-muted small">{{ constantGrowthMessage }}</span>
            <span v-else class="fw-semibold text-muted">{{ growth }}%</span>
        </div>
    `,
})
