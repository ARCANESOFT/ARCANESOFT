import { reactive, provide, inject, UnwrapRef } from 'vue'
import { ApiPayload, DatatableResponse } from '../types'

export type State = {
    draw:    number,
    results: DatatableResponse,
    payload: ApiPayload
    loading: boolean
    ready:   boolean
}

export const stateSymbol = Symbol('state')

export const createState = (): UnwrapRef<State> => reactive({
    draw:    0,
    results: <DatatableResponse> {},
    ready:   false,
    loading: false,
    payload: {
        url: null,
        params: {
            query: {},
        },
    }
})

export const useState = (): State => inject(stateSymbol)

export const provideState = (): void => provide(stateSymbol, createState())
