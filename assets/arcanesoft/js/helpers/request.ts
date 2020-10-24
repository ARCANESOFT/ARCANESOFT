import { RequestConfig, RequestInstance } from '@arcanesoft/core/src/helpers/request'

export default (options?: RequestConfig): RequestInstance => window['request'](options)
