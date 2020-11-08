import useState from './store/state'
import useRequest from '../../../helpers/request'
import { merge as _merge } from 'lodash-es'

const state = useState()
const request = useRequest()

export default () => {
    const fetch = async (url?: string, params: Object = {}): Promise<void> => {
        try {
            state.loading = true
            state.payload.url = url ?? state.payload.url
            state.payload.params = _merge(state.payload.params, params)
            await request
                .post(state.payload.url, state.payload.params)
                .then(({ data }) => {
                    state.results = data
                })
        }
        catch (e) {
            console.log(e)
        }

        state.loading = false
    }

    return {
        fetch,
    }
}
