import { defineComponent, computed, ref } from 'vue'
import { useActions, useGetters, useHelpers } from '../../store'
import { MediaItem } from '../../types'
import { trans } from '../../helpers/translator'
import formErrors, { FormErrorsInterface } from '@arcanescripts/form-errors'

export default defineComponent({
    name: 'v-media-rename-item',

    setup() {
        const { loadItems, renameItem, closeMediaTool } = useActions()
        const { isLoading, selectedItems } = useGetters()
        const { normalizeLocation } = useHelpers()

        const item = computed<MediaItem>(() => selectedItems.value[0])
        const name = ref<string>(item.value.name)
        const errors = ref<FormErrorsInterface>(formErrors())
        const hasChanged = computed<boolean>(() => name.value !== item.value.name);
        const newPath = computed<string>(() => normalizeLocation(name.value))

        const onSubmit = async (): Promise<void> => {
            errors.value.reset()

            return await renameItem(item.value.path, name.value)
                .then((response) => {
                    if (response.status !== 200)
                        return

                    closeMediaTool()
                    loadItems()
                })
                .catch(({ response }) => {
                    if (response && response.status === 422)
                        errors.value.setErrors(response.data.errors || {})
                })
        }

        return {
            trans,
            name,
            onSubmit,
            isLoading,
            hasChanged,
            newPath,
        }
    },

    template: `
        <div class="bg-white p-3">
            <label for="name">{{ trans('Rename') }}</label>
            <div class="input-group">
                <input type="text" v-model="name" @keyup.enter="onSubmit" id="name" required
                       class="form-control" :class="{'is-invalid': errors.has('new_name')}" :readonly="isLoading">
                <div class="input-group-append">
                    <button @click.prevent="onSubmit" :disabled=" ! hasChanged || isLoading"
                            class="btn btn-warning" type="button">{{ trans(isLoading ? 'Loading...' : 'Rename') }}</button>
                </div>
                <div class="invalid-feedback"
                     v-if="errors.has('new_name')" v-text="errors.first('new_name')"></div>
            </div>
        </div>
    `,
})
