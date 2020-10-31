import request, { RequestConfig } from "@arcanesoft/core/src/helpers/request";

export default () => {
    const api = request({
        baseURL: `/account/settings/security/browser-sessions`,
    })

    return {
        request: api,

        fetchSessions: () => api.get('status'),
        logoutOtherSessions: (config?: RequestConfig) => api.delete('logout-others', config),
    }
}
