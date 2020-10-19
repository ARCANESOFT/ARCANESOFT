import { defineComponent, computed, ref } from 'vue'
import { MediaItem } from '../../types'
import selectedMediaItems from '../../store/getters/media/selected-media-items'
import currentLocation from '../../store/getters/location/current-location'
import renameMediaItem from '../../store/actions/media/rename-media-item'
import loadMediaItems from '../../store/actions/media/load-media-items'
import closeActiveMediaTool from '../../store/actions/tools/close-active-media-tool'
import stopLoading from '../../store/actions/loading/stop-loading'
import isLoading from '../../computed/is-loading'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-media-rename-item',

    mixins: [
        translator,
    ],

    setup() {
        const item = computed((): MediaItem => selectedMediaItems()[0])

        const name = ref(item.value.name)

        // TODO: Replace with the validation messages helper
        const errors = ref({
            'new_name': []
        })

        function rename(): void {
            resetErrors()

            renameMediaItem(item.value.path, this.newPath)
                .then((response) => {
                    if (response.status === 200) {
                        closeActiveMediaTool()
                        loadMediaItems().then()
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422)
                        errors.value = error.response.data.errors || {}

                    stopLoading()
                })
        }

        function resetErrors(): void {
            errors.value = {
                'new_name': []
            }
        }

        // Computed
        const hasChanged = computed((): boolean => name.value !== item.value.name);
        const nameError = computed((): string | null => errors.value['new_name'][0] || null);
        const hasNameError = computed((): boolean => nameError.value !== null)
        const newPath = computed((): string => {
            let location = currentLocation()

            return location === '/'
                ? name.value
                : `${location}/${name.value}`;
        })

        return {
            name,
            rename,
            isLoading,
            hasChanged,
            nameError,
            hasNameError,
            newPath,
        }
    },

    template: `
        <div class="bg-white p-3">
            <label for="name">{{ trans('Rename') }}</label>
            <div class="input-group">
                <input type="text" v-model="name" @keyup.enter="rename" id="name" required
                       class="form-control" :class="{'is-invalid': hasNameError}" :readonly="isLoading">
                <div class="input-group-append">
                    <button @click.prevent="rename" :disabled=" ! hasChanged || isLoading"
                            class="btn btn-warning" type="button">{{ trans(isLoading ? 'Loading...' : 'Rename') }}</button>
                </div>
                <div class="invalid-feedback" v-if="hasNameError">{{ nameError }}</div>
            </div>
        </div>
    `,
})
