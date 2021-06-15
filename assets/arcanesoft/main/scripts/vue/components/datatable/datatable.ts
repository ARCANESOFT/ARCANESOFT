import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useActions, useGetters, useMutations } from './store'
import useArcanesoft from '../../../helpers/arcanesoft'
import useTranslator from '../../../mixins/translator'

import {
    DatatableFilters,
    DatatableColumns,
    DatatableOverlay,
    DatatablePagination,
    DatatablePaginationInfo,
    DatatablePerPageSelect,
    DatatableReloadButton,
    DatatableRows,
    DatatableSearchInput,
    DatatableStateEmpty,
    DatatableStateLoading,
} from './components'

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
        DatatableStateEmpty,
        DatatableStateLoading,
    },

    setup(props) {
        const { isEmpty, isLoading, isReady, hasFilters, hasPagination } = useGetters()
        const { load, reload } = useActions()
        const { markAsReady } = useMutations()
        const { trans } = useTranslator()

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
            trans,
        }
    },

    template: `
        <div class="v-dt-card" :class="{'v-card-loading': isLoading}">
            <DatatableOverlay v-if="isLoading"/>

            <div class="v-dt-card-header">
                <span v-if=" ! isReady" v-text="trans('Loading...')"></span>
                <div v-if="isReady" class="v-dt-toolbar d-grid gap-2">
                    <div class="row g-2">
                        <div class="col">
                            <DatatableSearchInput/>
                        </div>
                        <div class="col-auto">
                            <DatatableReloadButton/>
                        </div>
                        <div class="col-auto" v-if="hasFilters">
                            <DatatableFilters/>
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

            <DatatableStateLoading v-if=" ! isReady"/>
            <DatatableStateEmpty v-else-if="isEmpty"/>

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
