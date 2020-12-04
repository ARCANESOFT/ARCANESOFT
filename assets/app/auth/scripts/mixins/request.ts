import { RequestInstance, RequestConfig } from '@arcanescripts/request'

export { RequestInstance, RequestConfig }

export default (config?: RequestConfig): RequestInstance => window['request'](config)
