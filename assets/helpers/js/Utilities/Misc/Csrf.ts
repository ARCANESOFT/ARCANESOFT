class Csrf {
    protected static selector = 'meta[name="csrf-token"]'

    static token() {
        const token = document.head.querySelector(Csrf.selector)

        if (token === undefined) {
            console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')

            return null
        }

        return token.getAttribute('content');
    }
}

export default Csrf

