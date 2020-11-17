import request from '../mixins/request'

export default () => {
    const logout = (url: string): void => {
        request()
            .delete(url)
            .then(({ data }) => data.redirect)
            .then((redirectUrl: string) => {
                location.replace(redirectUrl)
            })
            .catch(() => {
                location.reload()
            })
    }

    return {
        logout,
    }
}
