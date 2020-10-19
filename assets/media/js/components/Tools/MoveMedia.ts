import { defineComponent, ref, computed } from 'vue'
import { MediaItem } from '../../types'
import { MEDIA_TYPES } from '../../enums'
import moveMediaItem from '../../store/actions/media/move-media-item'
import loadMediaItems from '../../store/actions/media/load-media-items'
import closeActiveMediaTool from '../../store/actions/tools/close-active-media-tool'
import getDirectories from '../../store/getters/media/media-directories'
import currentLocation from '../../store/getters/location/current-location'
import startLoading from '../../store/actions/loading/start-loading'
import translator from '../../mixins/translator'
import isLoading from '../../computed/is-loading'
import selectedMediaItems from '../../computed/media/selected-items'

export default defineComponent({
    name: 'v-media-move-item',

    mixins: [
        translator,
    ],

    setup() {
        // Refs
        const destination = ref(null)
        const directories = ref([])
        const results = ref([])

        directories.value = getDirectories()

        function moveMedia(): void {
            if ( ! this.hasSelectedDestination)
                return

            startLoading()

            const requests = this.items.map(
                (item: MediaItem) => moveMediaItem(this.destination, item.path).then(response => {
                    this.results.push({
                        item,
                        status: response.status === 200 ? 'success' : 'failed',
                    })
                })
            )

            Promise.all(requests).then(() => {
                loadMediaItems().then(() => { closeActiveMediaTool() })
            })
        }

        // Computed
        const hasSelectedDestination = computed((): boolean => destination !== null)
        const showParentDestination = computed((): boolean => currentLocation() !== '/')
        const destinations = computed((): Array<MediaItem> => {
            const destinationsToExclude = selectedMediaItems.value
                .filter((item: MediaItem) => item.type === MEDIA_TYPES.DIRECTORY)
                .map((item: MediaItem) => item.name)

            return directories.value.filter((item: MediaItem) => ! destinationsToExclude.includes(item.name));
        })

        return {
            isLoading,

            destination,
            directories,
            results,

            moveMedia,

            selectedMediaItems,
            hasSelectedDestination,
            showParentDestination,
            destinations,
        }
    },

    template: `
        <div class="bg-white p-3">
            <label for="destination">{{ trans('Select a Destination') }}</label>
            <div class="input-group mb-3">
                <select v-model="destination" id="destination" class="form-control" :readonly="isLoading">
                    <option value=".." v-if="showParentDestination">..</option>
                    <option v-for="destination in destinations"
                            :value="destination.name"
                            v-text="destination.name"></option>
                </select>
                <div class="input-group-append">
                    <button @click.prevent="moveMedia" type="button"
                            class="btn btn-primary"
                            :disabled="isLoading || ! hasSelectedDestination">
                        {{ trans(isLoading ? 'Loading...' : 'Move') }}
                    </button>
                </div>
            </div>

            <ul class="pl-3 mb-0">
                <li v-for="item in selectedMediaItems" :key="item.path">{{ item.name }}</li>
            </ul>
        </div>
    `,
})

