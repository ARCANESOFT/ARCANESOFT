import useGetters from './getters'
import useMutations from './mutations'
import { DatatablePageLink, DatatableSortByColumn } from '../types'
import {merge as _merge} from 'lodash-es'
import useRequest from '../../../../helpers/request'

const { payloadUrl, payloadParams, draw } = useGetters()
const { startLoading, stopLoading, setPayloadUrl, setPayloadParams, setResults, resetPaginationUrl, setDraw } = useMutations()

const request = useRequest()

/**
 * API fetch request.
 */
const fetch = async (url?: string, params: Object = {}): Promise<void> => {
    try {
        startLoading()
        setPayloadUrl(url ?? payloadUrl.value)
        setPayloadParams(_merge(payloadParams.value, params))
        setDraw(draw.value + 1)

        await request
            .post(payloadUrl.value, payloadParams.value)
            .then(({ data }) => {
                setResults(data)
            })
    }
    catch (e) {
        console.log(e) // TODO: Add an error handler / messages
    }

    stopLoading()
}

export type Actions = {
    load: (url: string) => Promise<void>
    reload: (params?: Object) => Promise<void>
    reset: (params?: Object) => Promise<void>,
    goToPage: (link?: DatatablePageLink) => Promise<void> | null
    searchQuery: (search: string) => Promise<void>
    changePerPage: (perPage: number) => Promise<void>
    changeSortBy: (sortBy: DatatableSortByColumn[]) => Promise<void>
    applyFilter: (name: string, value: any) => Promise<void>
}

export default (): Actions => {
    const load = async (url: string): Promise<void> => await fetch(url)
    const reload = async (params?: Object): Promise<void> => await fetch(null, params)
    const reset = async (params?: Object): Promise<void> => {
        resetPaginationUrl()

        return await reload(params)
    }

    const goToPage = async (link: DatatablePageLink): Promise<void> | null => await load(link.url)

    const searchQuery = async (search: string): Promise<void> => await reset({
        query: {search},
    })

    const changePerPage = async (perPage: number): Promise<void> => await reset({
        'per_page': perPage
    })

    const changeSortBy = async (sortBy: DatatableSortByColumn[]): Promise<void> => await reload({
        query: {'sort_by': sortBy},
    })

    const applyFilter = async (name: string, value: any): Promise<void > => {
        let filters = {}
        filters[name] = value

        return await reset({
            query: {
                filter_by: filters
            },
        })
    }

    return {
        load,
        reload,
        reset,
        goToPage,
        searchQuery,
        changePerPage,
        changeSortBy,
        applyFilter,
    }
}
