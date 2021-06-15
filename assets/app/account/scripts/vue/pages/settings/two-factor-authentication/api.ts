import { ref } from 'vue'
import request, { RequestConfig } from '../../../../mixins/request'

export default () => {
    const api = request({
        baseURL: `/account/settings/security/two-factor`,
    })

    const isLoading = ref<boolean>(false)

    const onFinally = () => {
        isLoading.value = false
    }

    return {
        request: api,

        isLoading,

        /**
         * Get the two factor authentication status.
         */
        status: (config?: RequestConfig) => {
            isLoading.value = true

            return api.get('status', config).finally(onFinally)
        },

        /**
         * Enable the two factor authentication.
         */
        enable: (config?: RequestConfig) => {
            isLoading.value = true

            return api.post('enable', config).finally(onFinally)
        },

        /**
         * Disable the two factor authentication.
         */
        disable: (config?: RequestConfig) => {
            isLoading.value = true

            return api.delete('disable', config).finally(onFinally)
        },

        /**
         * Regenerate recovery codes.
         */
        regenerate: (config?: RequestConfig) => {
            isLoading.value = true

            return api.put('regenerate', config).finally(onFinally)
        },
    }
}
