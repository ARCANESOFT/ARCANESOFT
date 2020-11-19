import { defineComponent, ref, onMounted, onUnmounted, UnwrapRef } from 'vue'
import { useGetters } from '../../store'
import useTranslator from '../../../../../mixins/translator'
import { DatatableFilter } from '../../types'
import { FILTER_TYPE } from '../../enums'

import SelectFilter from './select'

export default defineComponent({
    name: 'v-datatable-filters',

    components: {
        SelectFilter,
    },

    setup() {
        const { filters, isFiltersApplied } = useGetters()
        const { trans } = useTranslator()

        const dropdownMenuRef = ref(null)
        const isSelectFilter = (filter: UnwrapRef<DatatableFilter>): boolean => filter.type === FILTER_TYPE.SELECT

        const stopPropagationHandler = (e) => { e.stopPropagation() }

        onMounted(() => {
            dropdownMenuRef.value.addEventListener('click', stopPropagationHandler)
        })

        onUnmounted(() => {
            dropdownMenuRef.value.removeEventListener('click', stopPropagationHandler)
        })

        return {
            dropdownMenuRef,
            filters,
            isFiltersApplied,
            isSelectFilter,
            trans,
        }
    },

    template: `
        <div class="v-dt-filters btn-group" :class="{'v-dt-filters-applied': isFiltersApplied}" role="group">
            <button
                id="v-dt-filters-menu"
                class="v-dt-toolbar-button v-dt-filters-dropdown-btn dropdown-toggle" type="button"
                data-toggle="dropdown" aria-expanded="false"
                :aria-label="trans('Toggle Filters Dropdown')"><i class="fas fa-fw fa-filter"></i></button>
            <div ref="dropdownMenuRef" class="v-dt-filters-menu dropdown-menu dropdown-menu-right"
                 aria-labelledby="v-dt-filters-menu">
                <div>
                    <h6 class="dropdown-header fw-bold" v-text="trans('Filters')"></h6>
                </div>
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
