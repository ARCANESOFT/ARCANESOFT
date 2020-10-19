import RequestInterface from './RequestInterface'
import tap from '../../functions/tap'
import axios, {AxiosInstance, AxiosResponse} from 'axios'

class AxiosRequest implements RequestInterface {
    // Properties

    private instance: AxiosInstance

    // Constructor

    constructor(options: Object = {}) {
        this.instance = AxiosRequest.createInstance(options)
    }

    private static createInstance(options: Object|any = {}): AxiosInstance {
        return tap(axios.create(options), (instance: AxiosInstance) => {
            instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        })
    }

    // Main Methods
    request(config: Object|any = {}): Promise<AxiosResponse> {
        return this.instance.request(config)
    }

    get(url: string, config?: Object|any): Promise<AxiosResponse> {
        return this.instance.get(url, config)
    }

    delete(url: string, config?: Object|any): Promise<AxiosResponse> {
        return this.instance.delete(url, config)
    }

    head(url: string, config?: Object|any): Promise<AxiosResponse> {
        return this.instance.head(url, config)
    }

    post(url: string, data?: Object, config?: Object|any): Promise<AxiosResponse> {
        return this.instance.post(url, data, config)
    }

    put(url: string, data?: Object, config?: Object|any): Promise<AxiosResponse> {
        return this.instance.put(url, data, config)
    }

    patch(url: string, data?: Object, config?: Object|any): Promise<AxiosResponse> {
        return this.instance.patch(url, data, config)
    }

    getUri(config?: Object|any) {
        return this.instance.getUri(config)
    }
}

export default AxiosRequest;
