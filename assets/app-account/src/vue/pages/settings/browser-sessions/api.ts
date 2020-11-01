import request, { RequestConfig } from '../../../../mixins/request'

export default () => {
    const api = request({
        baseURL: `/account/settings/security/browser-sessions`,
    })

    return {
        request: api,

        fetchSessions: (config?: RequestConfig) => api.get('status', config),
        logoutOtherSessions: (config?: RequestConfig) => api.delete('logout-others', config),
    }
}
