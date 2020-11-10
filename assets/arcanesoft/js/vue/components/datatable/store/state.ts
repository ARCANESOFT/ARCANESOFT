import { reactive, UnwrapRef } from 'vue'
import { ApiPayload, DatatableResponse } from '../types'

export type State = {
    draw:    number,
    results: DatatableResponse,
    payload: ApiPayload
    loading: boolean
    ready:   boolean
}

const state = reactive<State>({
    draw:    0,
    results: <DatatableResponse> {},
    ready:   false,
    loading: false,
    payload: {
        url: null,
        params: {},
    }
})

export default (): UnwrapRef<State> => state
