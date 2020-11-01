import { RequestInstance, RequestConfig } from '@arcanesoft/core/src/helpers/request'

export { RequestInstance, RequestConfig }

export default (config?: RequestConfig): RequestInstance => window['request'](config)
