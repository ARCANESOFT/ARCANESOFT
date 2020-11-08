import mutations from './mutations'
import api from '../api'
import { DatatablePageLink, DatatableSortByColumn } from '../types'

export type Actions = {
    load: (url: string) => Promise<void>
    reload: (params?: Object) => Promise<void>
    goToPage: (link?: DatatablePageLink) => Promise<void> | null
    searchQuery: (search: string) => Promise<void>
    changePerPage: (perPage: number) => Promise<void>
    changeSortBy: (sortBy: DatatableSortByColumn[]) => Promise<void>
    applyFilter: (name: string, value: any) => Promise<void>
}

export default (): Actions => {
    const { fetch } = api()
    const { resetPaginationUrl } = mutations()

    const load = async (url: string): Promise<void> => await fetch(url)
    const reload = async (params?: Object): Promise<void> => await fetch(null, params)
    const reset = async (params?: Object): Promise<void> => {
        resetPaginationUrl()

        return await reload(params)
    }

    const goToPage = async (link?: DatatablePageLink): Promise<void> | null => {
        if (link.url === null)
            return

        return await fetch(link.url)
    }

    const searchQuery = async (search: string): Promise<void> => {
        await reset({
            query: {search},
        })
    }

    const changePerPage = async (perPage: number): Promise<void> => {
        return await reset({'per_page': perPage})
    }

    const changeSortBy = async (sortBy: DatatableSortByColumn[]): Promise<void> => {
        return await reload({query: {'sort_by': sortBy}})
    }

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
        goToPage,
        searchQuery,
        changePerPage,
        changeSortBy,
        applyFilter,
    }
}
