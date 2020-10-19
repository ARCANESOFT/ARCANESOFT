import RequestInterface from '@arcanesoft/helpers/js/Utilities/Request/RequestInterface'

export default (options?: Object): RequestInterface => window['request'](options)
