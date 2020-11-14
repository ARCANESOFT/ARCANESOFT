import { defineComponent, onMounted, onUnmounted } from 'vue'

import useActions from './store/actions'
import useGetters from './store/getters'
import useMutations from './store/mutations'
import useArcanesoft from '../../../helpers/arcanesoft'

import DatatableFilters from './components/filters'
import DatatableColumns from './components/columns'
import DatatableOverlay from './components/overlay'
import DatatablePagination from './components/pagination'
import DatatablePaginationInfo from './components/pagination/info'
import DatatablePerPageSelect from './components/per-page-select'
import DatatableReloadButton from './components/buttons/reload'
import DatatableRows from './components/rows'
import DatatableSearchInput from './components/search-input'

const EVENT_RELOAD = 'arcanesoft::datatable.reload'

export default defineComponent({
    name: 'v-datatable-card',

    props: {
        name: {
            type: String,
            default: 'datatable',
        },

        url: {
            type: String,
            required: true,
        },
    },

    components: {
        DatatableColumns,
        DatatableFilters,
        DatatableOverlay,
        DatatablePagination,
        DatatablePaginationInfo,
        DatatablePerPageSelect,
        DatatableReloadButton,
        DatatableRows,
        DatatableSearchInput,
    },

    setup(props) {
        const { isEmpty, isLoading, isReady, hasFilters, hasPagination } = useGetters()
        const { load, reload } = useActions()
        const { markAsReady } = useMutations()

        const arcanesoft = useArcanesoft()

        const onReload = async ({name}) => {
            if (props.name === name)
                await reload()
        }

        onMounted(async () => {
            await load(props.url)

            markAsReady()

            arcanesoft.on(EVENT_RELOAD, onReload)
        })

        onUnmounted(() => {
            arcanesoft.off(EVENT_RELOAD, onReload)
        })

        return {
            hasFilters,
            hasPagination,
            isLoading,
            isReady,
            isEmpty,
        }
    },

    template: `
        <div class="v-dt-card" :class="{'v-card-loading': isLoading}">
            <DatatableOverlay v-if="isLoading"/>

            <div class="v-dt-card-header">
                <span v-if=" ! isReady">Loading...</span>
                <div v-if="isReady" class="v-datatable-toolbar d-grid gap-2">
                    <div class="row g-2">
                        <div class="col">
                            <DatatableSearchInput/>
                        </div>
                        <div class="col-auto">
                            <div class="btn-group" role="group">
                                <DatatableReloadButton/>
                                <DatatableFilters v-if="hasFilters"/>
                            </div>
                        </div>
                    </div>

                    <div class="row g-2" v-if="hasPagination && ! isEmpty">
                        <div class="col-auto">
                            <DatatablePerPageSelect/>
                        </div>
                        <div class="col">
                            <DatatablePagination/>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if=" ! isReady" style="min-height: 10rem;"></div>
            <div v-if="isReady && isEmpty" class="v-dt-card-body">
                <h4 class="fw-light text-center text-muted m-0">There is no entries to show</h4>
            </div>
            <table v-if="isReady && ! isEmpty" class="v-dt-table">
                <DatatableColumns/>
                <DatatableRows/>
            </table>

            <div class="v-dt-card-footer d-flex justify-content-between align-items-center" v-if="isReady">
                <DatatablePaginationInfo/>
                <DatatablePagination v-if="hasPagination && ! isEmpty"/>
            </div>
        </div>
    `,
})
