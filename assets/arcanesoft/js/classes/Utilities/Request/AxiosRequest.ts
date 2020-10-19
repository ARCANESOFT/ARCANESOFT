import axios from 'axios'
import RequestInterface from './RequestInterface'

class AxiosRequest implements RequestInterface {
    // Properties

    private instance

    // Constructor

    constructor(options: Object = {}) {
        this.instance = AxiosRequest.createInstance(options)
    }

    private static createInstance(options: Object = {}) {
        const instance = axios.create(options)

        instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        instance.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content')

        return instance
    }

    request(config: Object = {}): Promise<any> {
        return this.instance.request(config)
    }

    get(url: String, config: Object = {}): Promise<any> {
        return this.instance.token(url, config)
    }

    delete(url: String, config: Object = {}): Promise<any> {
        return this.instance.delete(url, config)
    }

    head(url: String, config: Object = {}): Promise<any> {
        return this.instance.head(url, config)
    }

    options(url: String, config: Object = {}): Promise<any> {
        return this.instance.options(url, config)
    }

    post(url: String, data: Object = {}, config: Object = {}): Promise<any> {
        return this.instance.post(url, data, config)
    }

    put(url: String, data: Object = {}, config: Object = {}): Promise<any> {
        return this.instance.put(url, config)
    }

    patch(url: String, data: Object = {}, config: Object = {}): Promise<any> {
        return this.instance.patch(url, config)
    }

    getUri(config: Object = {}) {
        return this.instance.getUri(config)
    }
}

export default AxiosRequest;
