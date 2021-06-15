import request, { RequestConfig } from '../../../../mixins/request'

const api = request({
    baseURL: `/account/settings/security/browser-sessions`,
})

export default () => ({
    request: api,

    fetchSessions: (config?: RequestConfig) => api.get('status', config),
    logoutOtherSessions: (config?: RequestConfig) => api.delete('logout-others', config),
})
