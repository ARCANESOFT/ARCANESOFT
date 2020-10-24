import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import tap from '@arcanesoft/core/src/functions/tap'

export type RequestInstance = AxiosInstance
export type RequestConfig = AxiosRequestConfig

export default (options?: AxiosRequestConfig): RequestInstance => tap(
    axios.create(options), (instance: RequestInstance): void => {
        instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    }
)
