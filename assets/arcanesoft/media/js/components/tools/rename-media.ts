import { defineComponent, computed, ref } from 'vue'
import { MediaItem } from '../../types'
import location from '../../store/modules/location'
import loading from '../../store/modules/loading'
import mediaTools from '../../store/modules/media-tools'
import mediaItems from '../../store/modules/media-items'
import selectedMediaItems from '../../store/modules/selected-media-items'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-rename-item',

    setup() {
        const { normalize: normalizeLocation} = location()
        const { handleLoading, isLoading } = loading()
        const { close: closeMediaTool } = mediaTools()
        const { loadItems, renameItem: renameMediaItem } = mediaItems()
        const { items } = selectedMediaItems()

        const item = computed<MediaItem>(() => items.value[0])
        const name = ref<string>(item.value.name)

        // TODO: Replace with the validation messages helper
        const errors = ref({
            'new_name': []
        })

        const resetErrors = (): void => {
            errors.value = {
                'new_name': []
            }
        }

        const hasChanged = computed<boolean>(() => name.value !== item.value.name);
        const nameError = computed<string | null>(() => errors.value['new_name'][0] || null);
        const hasNameError = computed<boolean>(() => nameError.value !== null)
        const newPath = computed<string>(() => normalizeLocation(name.value))


        const rename = async (): Promise<void> => handleLoading(async (): Promise<void> => {
            resetErrors()

            return await renameMediaItem(item.value.path, name.value)
                .then((response) => {
                    if (response.status !== 200)
                        return

                    closeMediaTool()
                    loadItems()
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422)
                        errors.value = error.response.data.errors || {}
                })
        })

        return {
            trans,
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
