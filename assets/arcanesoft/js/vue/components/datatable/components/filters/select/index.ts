import { defineComponent, reactive, onMounted, PropType } from 'vue'
import { DatatableFilter } from '../../../types'
import useStore from '../../../store'

export default defineComponent({
    name: 'v-datatable-filter-select',

    props: {
        filter: {
            type: Object as PropType<DatatableFilter>,
            required: true,
        },
    },

    setup({ filter }) {
        const { applyFilter } = useStore()
        const value = reactive({
            selected: null,
            original: null,
        })

        onMounted(() => {
            value.selected = filter.value
            value.original = filter.value
        })

        const filterChanged = async (): Promise<void> => await applyFilter(filter.name, value.selected)

        return {
            value,
            filterChanged,
        }
    },

    template: `
        <label :for="filter.name" class="form-label">{{ filter.label }}</label>
        <select v-model="value.selected" :name="filter.name" :id="filter.name"
                @change="filterChanged" class="form-select">
            <option v-for="(label, value) in filter.options"
                    :value="value">{{ label }}</option>
        </select>
    `,
})
