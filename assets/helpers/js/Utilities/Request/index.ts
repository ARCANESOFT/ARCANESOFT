import Request from './AxiosRequest'

export default (options?: Object): Request => new Request(options || {})
