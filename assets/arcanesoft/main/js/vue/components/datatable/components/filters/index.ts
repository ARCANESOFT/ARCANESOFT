import { defineComponent, ref, onMounted, onUnmounted, UnwrapRef } from 'vue'
import { DatatableFilter } from '../../types'
import { FILTER_TYPE } from '../../enums'
import useGetters from '../../store/getters'

import SelectFilter from './select'

export default defineComponent({
    name: 'v-datatable-filters',

    components: {
        SelectFilter,
    },

    setup() {
        const { filters, isFiltersApplied } = useGetters()
        const dropdownMenu = ref(null)
        const isSelectFilter = (filter: UnwrapRef<DatatableFilter>): boolean => filter.type === FILTER_TYPE.SELECT

        const stopPropagationHandler = (e) => { e.stopPropagation() }

        onMounted(() => {
            dropdownMenu.value.addEventListener('click', stopPropagationHandler)
        })

        onUnmounted(() => {
            dropdownMenu.value.removeEventListener('click', stopPropagationHandler)
        })

        return {
            dropdownMenu,
            filters,
            isFiltersApplied,
            isSelectFilter,
        }
    },

    template: `
        <div class="v-datatable-filters btn-group" :class="{'v-datatable-filters-applied': isFiltersApplied}" role="group">
            <button
                id="v-datatable-filters-menu"
                class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" type="button"
                data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-fw fa-filter"></i> <span class="visually-hidden">Toggle Filters Dropdown</span>
            </button>
            <div ref="dropdownMenu" class="v-datatable-filters-menu dropdown-menu dropdown-menu-right"
                 aria-labelledby="v-datatable-filters-menu">
                <div class="px-3 py-2">
                    <div class="row row-cols-1 g-3">
                        <div class="col" v-for="filter in filters" :key="filter.name">
                            <SelectFilter :filter="filter" v-if="isSelectFilter(filter)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
