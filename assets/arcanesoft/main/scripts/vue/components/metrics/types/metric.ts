import MetricType from '../enums/metric-type'
import MetricRange from './metric-range'

type Metric = {
    type:  MetricType,
    class: string,
    title: string,
    ranges?: Array<MetricRange>,
}

export default Metric
