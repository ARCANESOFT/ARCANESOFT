import { defineComponent, ref } from 'vue'
import { PerPageOption } from '../types'
import useStore from '../store'

export default defineComponent({
    name: 'v-per-page-select',

    setup() {
        const { perPage, changePerPage } = useStore()
        const selected = ref<number>(perPage.value.selected)
        const options = ref<PerPageOption[]>(perPage.value.options)

        const onChange = async () => await changePerPage(selected.value)

        return {
            selected,
            options,
            onChange,
        }
    },

    template: `
        <div class="input-group">
            <label class="input-group-text">Per page</label>
            <select v-model="selected" class="form-select" @change="onChange">
                <option v-for="option in options"
                        :value="option.value" :selected="option.value">{{ option.label }}</option>
            </select>
        </div>
    `,
})