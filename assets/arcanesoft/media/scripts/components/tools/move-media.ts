import { defineComponent, ref, computed } from 'vue'
import { useActions, useGetters, useHelpers } from '../../store'
import { MediaItem, MediaItems } from '../../types'
import { MEDIA_TYPES } from '../../enums'
import { trans } from '../../helpers/translator'

export default defineComponent({
    name: 'v-media-move-item',

    setup() {
        const { moveItems } = useActions()
        const { isLoading, isRootLocation, directories, selectedItems } = useGetters()
        const { isMediaType } = useHelpers()

        // Refs
        const destination = ref<string | null>(null)
        const results = ref<any[]>([])

        // Computed
        const hasSelectedDestination = computed<boolean>(() => destination !== null)
        const showParentDestination = computed<boolean>(() => ! isRootLocation.value)
        const destinations = computed<MediaItems>(() => {
            const destinationsToExclude = selectedItems.value
                .filter((item: MediaItem) => isMediaType(item, MEDIA_TYPES.DIRECTORY))
                .map((item: MediaItem) => item.name)

            return directories.value.filter((item: MediaItem) => ! destinationsToExclude.includes(item.name));
        })

        // Methods

        const onClick = async (): Promise<void> => {
            if (hasSelectedDestination.value)
                results.value = await moveItems(selectedItems.value, destination.value)
        }

        return {
            trans,
            isLoading,
            destination,
            directories,
            onClick,
            selectedItems,
            hasSelectedDestination,
            showParentDestination,
            destinations,
        }
    },

    template: `
        <div class="bg-white p-3">
            <label for="destination" class="form-label">{{ trans('Select a Destination') }}</label>
            <div class="input-group mb-3">
                <select v-model="destination" id="destination" class="form-select" :readonly="isLoading"
                        :aria-label="trans('Choose a destination')">
                    <option :value="null">{{ trans('Choose...') }}</option>
                    <option value=".." v-if="showParentDestination">..</option>
                    <option v-for="destination in destinations"
                            :value="destination.name"
                            v-text="destination.name"></option>
                </select>
                <button @click.prevent="onClick" type="button"
                        class="btn btn-primary"
                        :disabled="isLoading || ! hasSelectedDestination">
                    {{ trans(isLoading ? 'Loading...' : 'Move') }}
                </button>
            </div>

            <ul class="pl-3 mb-0">
                <li v-for="item in selectedItems" :key="item.path">{{ item.name }}</li>
            </ul>
        </div>
    `,
})

