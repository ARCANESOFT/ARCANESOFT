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
        const { load, reload, isLoading, markAsReady, isReady, hasPagination } = useStore()
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
        }
    },

    template: `
        <div class="v-datatable v-datatable-card" :class="{'v-card-loading': isLoading}">
            <DatatableOverlay v-if="isLoading"/>

            <div class="v-datatable-card-header">
                <DatatableHeader v-if="isReady"/>
                <span v-else>Loading...</span>
            </div>

            <DatatableTable v-if="isReady"/>
            <div v-else style="min-height: 10rem;"></div>

            <div class="v-datatable-card-footer" v-if="isReady && hasPagination">
                <DatatableFooter/>
            </div>
        </div>
    `,
})
