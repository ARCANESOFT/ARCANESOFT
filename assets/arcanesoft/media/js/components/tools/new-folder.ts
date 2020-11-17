import { defineComponent, onMounted, ref } from 'vue'
import { useActions, useGetters, useHelpers } from '../../store'
import formErrors, { FormErrorsInterface } from '@arcanescripts/form-errors'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-new-folder',

    setup() {
        const { closeMediaTool, loadItems, createNewFolder } = useActions()
        const { isLoading, currentLocation } = useGetters()
        const { normalizeLocation } = useHelpers()

        const path = ref<string>('')
        const errors = ref<FormErrorsInterface>(formErrors())

        onMounted(() => {
            errors.value.reset()
        })

        const onSubmit = async (): Promise<void> => {
            errors.value.reset()

            await createNewFolder(normalizeLocation(path.value))
                .then((response) => {
                    if (response.status === 200) {
                        closeMediaTool()
                        loadItems()
                    }
                })
                .catch(({ response }) => {
                    if (response && response.status === 422) {
                        errors.value.setErrors(response.data.errors ?? {})
                    }
                })
        }

        return {
            trans,
            isLoading,
            currentLocation,
            errors,
            path,
            onSubmit,
        }
    },

    template: `
        <div class="bg-white p-3">
            <label for="path">{{ trans('New Folder') }}</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">{{ currentLocation }}</span>
                </div>
                <input v-model="path"
                       id="path" type="text" required
                       class="form-control" :class="{'is-invalid': errors.has('path')}" :readonly="isLoading"
                       aria-describedby="pathHelpBlock">
                <div class="input-group-append">
                    <button @click.prevent="onSubmit" :disabled="isLoading"
                            class="btn btn-primary" type="button">{{ trans(isLoading ? 'Loading...' : 'Create') }}</button>
                </div>
                <div class="invalid-feedback" v-if="errors.has('path')">{{ errors.first('path') }}</div>
            </div>
            <small id="pathHelpBlock" class="form-text text-muted">
                {{ trans('The path folder must be all in lowercase without special characters and separated with \`-\` (dash) instead for spaces.') }}
            </small>
        </div>
    `,
})
