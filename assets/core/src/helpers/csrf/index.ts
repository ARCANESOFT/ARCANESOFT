class Csrf {
    public static token(): string | null {
        const token = document.head.querySelector('meta[name="csrf-token"]')

        if (token !== undefined)
            return token.getAttribute('content');

        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')

        return null
    }
}

export default Csrf
