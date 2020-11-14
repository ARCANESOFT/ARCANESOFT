import { defineComponent, computed, reactive, onMounted, PropType } from 'vue'
import { DatatableFilter } from '../../../types'
import useActions from '../../../store/actions'
import useGetters from '../../../store/getters'

export default defineComponent({
    name: 'v-datatable-filter-select',

    props: {
        filter: {
            type: Object as PropType<DatatableFilter>,
            required: true,
        },
    },

    setup(props) {
        const { isLoading } = useGetters()
        const { applyFilter } = useActions()

        const value = reactive({
            selected: null,
            original: null,
        })

        const onChange = async (): Promise<void> => await applyFilter(props.filter.name, value.selected)

        const filterAttributes = computed(() => ({
            'name':     props.filter.name,
            'id':       props.filter.name,
            'class':    'form-select',
            'disabled': isLoading.value ? 'true' : null,
        }))

        onMounted(() => {
            value.selected = props.filter.value
            value.original = props.filter.value
        })

        return {
            filterAttributes,
            isLoading,
            onChange,
            value,
        }
    },

    template: `
        <label :for="filter.name" class="form-label">{{ filter.label }}</label>
        <select v-model="value.selected" @change="onChange" v-bind="filterAttributes">
            <option v-for="(label, value) in filter.options"
                    :value="value">{{ label }}</option>
        </select>
    `,
})
