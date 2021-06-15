import { ref } from 'vue'
import request, { RequestConfig } from '../../../../mixins/request'

export default () => {
    const api = request({
        baseURL: `/auth/password`,
    })

    const isLoading = ref<boolean>(false)

    const onFinally = () => {
        isLoading.value = false
    }

    return {
        request: api,

        isLoading,

        /**
         * Confirm the password.
         */
        confirm: (data: Object, config?: RequestConfig) => {
            isLoading.value = true

            return api.post('confirm', data, config).finally(onFinally)
        },

        /**
         * Check if the password is already confirmed.
         */
        status: (config?: RequestConfig) => {
            isLoading.value = true

            return api.get('confirm/status', config).finally(onFinally)
        },
    }
}
