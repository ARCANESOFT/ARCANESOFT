import { RequestConfig, RequestInstance } from '@arcanescripts/request'

export default (options?: RequestConfig): RequestInstance => window['request'](options)
