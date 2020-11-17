import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export type RequestInstance = AxiosInstance
export type RequestConfig = AxiosRequestConfig

export default (options?: RequestConfig): RequestInstance => {
    const instance = axios.create(options)

    instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

    return instance
}
