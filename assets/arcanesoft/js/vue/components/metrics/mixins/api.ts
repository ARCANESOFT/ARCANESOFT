import { ref, computed } from 'vue'
import { MetricResult } from '../types/metric-result'
import request from '../../../../helpers/request'
import config from '../config'

export default () => {
    let loading = ref<boolean>(true)
    let allowed = ref<boolean>(true)
    let result  = ref<boolean>(null)

    function fetch(metric: string, data: Object): Promise<MetricResult> {
        loading.value = true

        data = Object.assign({}, data, {metric})

        return request()
            .post(config.endpoint, data)
            .then(({data}) => {
                result.value = data

                return data
            })
            .catch(({response}) => {
                if (response && response.status === 403)
                    allowed.value = false
            })
            .finally(() => {
                loading.value = false
            })
    }

    return {
        fetch,
        result,
        isLoading: computed<boolean>((): boolean => loading.value),
        isReady:   computed<boolean>((): boolean => ! loading.value && result.value !== null),
        isAllowed: computed<boolean>((): boolean => allowed.value),
    }
}
