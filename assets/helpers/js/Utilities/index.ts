import Csrf from './Misc/Csrf'
import request from './Request'

export function csrf_token() {
    return Csrf.token()
}

export default {
    csrf_token,
    request
}
