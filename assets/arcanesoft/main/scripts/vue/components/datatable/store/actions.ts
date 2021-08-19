import useRequest from '../../../../helpers/request'
import useGetters from './getters'
import useMutations from './mutations'
import { DatatablePageLink, DatatableSortByColumn } from '../types'

const request = useRequest()

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
    const { payloadUrl, payloadParams, draw } = useGetters()
    const { startLoading, stopLoading, setPayloadUrl, setPayloadParams, setPayloadQuery, setResults, resetPaginationUrl, setDraw } = useMutations()

    /**
     * API fetch request.
     */
    const fetch = async (url?: string, params: Object = {}): Promise<void> => {
        try {
            startLoading()
            setPayloadUrl(url ?? payloadUrl.value)
            setPayloadParams(Object.assign({}, payloadParams.value, params))
            setDraw(draw.value + 1)

            await request
                .post(payloadUrl.value, payloadParams.value)
                .then(({ data }) => {
                    setResults(data)
                })
                .finally(() => {
                    stopLoading()
                })
        }
        catch (e) {
            console.log(e) // TODO: Add an error handler / messages
            stopLoading()
        }
    }

    const load = async (url: string): Promise<void> => await fetch(url)
    const reload = async (params?: Object): Promise<void> => await fetch(null, params)
    const reset = async (params?: Object): Promise<void> => {
        resetPaginationUrl()

        return await reload(params)
    }

    const goToPage = async (link: DatatablePageLink): Promise<void> | null => await load(link.url)

    const searchQuery = async (search: string): Promise<void> => {
        setPayloadQuery({ search })

        return await reset()
    }

    const changePerPage = async (perPage: number): Promise<void> => await reset({
        'per_page': perPage
    })

    const changeSortBy = async (sortBy: DatatableSortByColumn[]): Promise<void> => {
        setPayloadQuery({
            'sort_by': sortBy
        })

        return await reload()
    }

    const applyFilter = async (name: string, value: any): Promise<void > => {
        let filters = {}
        filters[name] = value

        setPayloadQuery({
            filter_by: filters
        })

        return await reset()
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
