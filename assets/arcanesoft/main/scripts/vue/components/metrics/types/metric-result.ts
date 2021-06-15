export type MetricResult = {
    value: number | null
    prefix: string | null
    suffix: string | null
    format: string | null
}

export type MetricPartitionValue = {
    label: string
    value: number
    color: string
}

export type MetricPartitionResult = MetricResult & {
    value: Array<MetricPartitionValue>
}

export type MetricRangedValueResult = MetricResult & {
    change: {
        label: string
        value: number | null
    }
    previous: {
        label: string | null
        value: number
    }
}

export type MetricTrendValue = {
    label: string
    value: number
}

export type MetricTrendResult = MetricResult & {
    trend: {
        [date: string]: MetricTrendValue
    }
}

export type MetricValueResult = MetricResult & {
    //
}
