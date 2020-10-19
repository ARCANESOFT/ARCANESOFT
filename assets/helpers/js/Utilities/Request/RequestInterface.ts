export default interface RequestInterface {
    // Main Methods
    request(config: Object): Promise<any>

    get(url: string, config?: Object): Promise<any>

    delete(url: string, config?: Object): Promise<any>

    head(url: string, config?: Object): Promise<any>

    post(url: string, data?: Object, config?: Object): Promise<any>

    put(url: string, data?: Object, config?: Object): Promise<any>

    patch(url: string, data?: Object, config?: Object): Promise<any>

    getUri(config?: Object)
};
