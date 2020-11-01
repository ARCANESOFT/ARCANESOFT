import { defineComponent, onMounted, ref, computed } from 'vue'
import loading from '../../store/modules/loading'
import location from '../../store/modules/location'
import mediaTools from '../../store/modules/media-tools'
import mediaItems from '../../store/modules/media-items'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-new-folder',

    setup() {
        const { isLoading, handleLoading } = loading()
        const { current: currentLocation, normalize: normalizeLocation } = location()
        const { close: closeMediaTool } = mediaTools()
        const { loadItems, createNewFolder } = mediaItems()

        const name = ref<string>('')

        // TODO: Replace with the validation messages helper
        const errors = ref({
            name: [],
        })

        const nameError = computed<string | null>(() => errors.value.name[0] || null)
        const hasNameError = computed<boolean>(() => nameError.value !== null)

        onMounted(() => {
            resetErrors()
        })

        const resetErrors = (): void => {
            errors.value = {
                name: []
            }
        }

        const submit = (): Promise<void> => handleLoading(async (): Promise<void> => {
            resetErrors()

            await createNewFolder(normalizeLocation(name.value))
                .then((response) => {
                    if (response.status === 200) {
                        closeMediaTool()
                        loadItems()
                    }
                })
                .catch((error) => {
                    // TODO: Replace with (laravel) validation messages helper
                    if (error.response && error.response.status === 422)
                        errors.value = error.response.data.errors || {}
                })
        })

        return {
            trans,
            isLoading,
            currentLocation,
            nameError,
            hasNameError,
            submit,
        }
    },

    template: `
        <div class="bg-white p-3">
            <label for="name">{{ trans('New Folder') }}</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">{{ currentLocation }}</span>
                </div>
                <input v-model="name"
                       id="name" type="text" required
                       class="form-control" :class="{'is-invalid': hasNameError}" :readonly="isLoading"
                       aria-describedby="nameHelpBlock">
                <div class="input-group-append">
                    <button @click.prevent="submit" :disabled="isLoading"
                            class="btn btn-primary" type="button">{{ trans(isLoading ? 'Loading...' : 'Create') }}</button>
                </div>
                <div class="invalid-feedback" v-if="hasNameError">{{ nameError }}</div>
            </div>
            <small id="nameHelpBlock" class="form-text text-muted">
                {{ trans('The name folder must be all in lowercase without special characters and separated with \`-\` (dash) instead for spaces.') }}
            </small>
        </div>
    `,
})
