import { defineComponent, ref } from 'vue'
import { useActions, useGetters } from '../store'
import useTranslator from '../../../../mixins/translator'
import { PerPageOption } from '../types'

export default defineComponent({
    name: 'v-per-page-select',

    setup() {
        const { changePerPage } = useActions()
        const { perPage } = useGetters()
        const { trans } = useTranslator()

        // Refs
        const selected = ref<number>(perPage.value.selected)
        const options = ref<PerPageOption[]>(perPage.value.options)

        // Methods
        const onChange = async () => await changePerPage(selected.value)

        return {
            selected,
            options,
            onChange,
            trans,
        }
    },

    template: `
        <div class="input-group">
            <label class="input-group-text" v-text="trans('Per page')"></label>
            <select v-model="selected" class="form-select" @change="onChange">
                <option v-for="option in options"
                        :value="option.value" :selected="option.value">{{ option.label }}</option>
            </select>
        </div>
    `,
})
