import { defineComponent, onMounted, onUnmounted } from 'vue'
import useStore from './store'
import useArcanesoft from '../../../helpers/arcanesoft'

import DatatableOverlay from './components/overlay'
import DatatableHeader from './components/header'
import DatatableTable from './components/table'
import DatatableFooter from './components/footer'

const EVENT_RELOAD = 'arcanesoft::datatable.reload'

export default defineComponent({
    name: 'v-datatable',

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
        DatatableOverlay,
        DatatableHeader,
        DatatableTable,
        DatatableFooter,
    },

    setup(props) {
        const { load, reload, isLoading, isReady, isEmpty, markAsReady, hasPagination } = useStore()
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
            hasPagination,
            isLoading,
            isReady,
            isEmpty,
        }
    },

    template: `
        <div class="v-datatable v-datatable-card" :class="{'v-card-loading': isLoading}">
            <DatatableOverlay v-if="isLoading"/>

            <div class="v-datatable-card-header">
                <span v-if=" ! isReady">Loading...</span>
                <DatatableHeader v-if="isReady"/>
            </div>

            <div v-if="isReady && isEmpty" class="card-body">
                <h4 class="fw-light text-center text-muted">There is no entires to show</h4>
            </div>

            <div v-if=" ! isReady" style="min-height: 10rem;"></div>
            <DatatableTable v-if="isReady && ! isEmpty"/>

            <div class="v-datatable-card-footer" v-if="isReady && hasPagination">
                <DatatableFooter/>
            </div>
        </div>
    `,
})
