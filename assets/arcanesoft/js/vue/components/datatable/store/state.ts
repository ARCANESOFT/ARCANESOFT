import { reactive, UnwrapRef } from 'vue'
import { ApiPayload, DatatableResponse } from '../types'

export type State = {
    results: DatatableResponse,
    payload: ApiPayload
    loading: boolean
    ready:   boolean
}

const state = reactive<State>({
    results: <DatatableResponse> {},
    ready: false,
    loading: false,
    payload: {
        url: null,
        params: {},
    }
})

export default (): UnwrapRef<State> => state
