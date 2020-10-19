import { defineComponent, ref, computed } from 'vue'
import closeActiveMediaTool from '../../store/actions/tools/close-active-media-tool'
import createNewFolder from '../../store/actions/media/create-new-folder'
import loadMediaItems from '../../store/actions/media/load-media-items'
import stopLoading from '../../store/actions/loading/stop-loading'
import isLoading from '../../computed/is-loading'
import currentLocation from '../../computed/location/current-location'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-media-new-folder',

    mixins: [
        translator,
    ],

    setup() {
        const name = ref('')

        // TODO: Replace with the validation messages helper
        const errors = ref({
            name: [],
        })

        function resetErrors(): void {
            errors.value = {
                name: []
            }
        }

        resetErrors()

        function submit(): void {
            resetErrors()

            const path = currentLocation.value === '/'
                ? name.value
                : `${currentLocation.value}/${name.value}`

            createNewFolder(path)
                .then((response) => {
                    if (response.status === 200) {
                        closeActiveMediaTool()
                        loadMediaItems().then()
                    }
                })
                .catch((error) => {
                    // TODO: Replace with (laravel) validation messages helper
                    if (error.response && error.response.status === 422)
                        errors.value = error.response.data.errors || {}

                    stopLoading()
                })
        }

        const nameError = computed((): string | null => errors.value.name[0] || null)
        const hasNameError = computed((): boolean => nameError.value !== null)

        return {
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
