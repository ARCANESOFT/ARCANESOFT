interface RequestInterface {
    request(config): Promise<any>

    get(url: String, config: Object): Promise<any>

    delete(url: String, config: Object): Promise<any>

    head(url: String, config: Object): Promise<any>

    options(url: String, config: Object): Promise<any>

    post(url: String, data: Object, config: Object): Promise<any>

    put(url: String, data: Object, config: Object): Promise<any>

    patch(url: String, data: Object, config: Object): Promise<any>

    getUri(config: Object)
}

export default RequestInterface;
