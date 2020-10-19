import { defineComponent, onMounted, computed } from 'vue'
import { EVENTS } from '../enums'
import mediaDirectories from '../store/getters/media/media-directories'
import mediaFiles from '../store/getters/media/media-files'
import loadMediaItems from '../store/actions/media/load-media-items'
import translator from '../mixins/translator'
import isLoading from '../computed/is-loading'
import currentLocation from '../computed/location/current-location'
import hasActiveMediaTool from '../computed/tools/has-active-media-tool'
import isPreviewModeActive from '../computed/preview-mode/is-preview-mode-active'

import MediaToolbar from './Elements/MediaToolbar'
import MediaBreadcrumbs from './Elements/MediaBreadcrumbs'
import MediaItemsContainer from './Elements/MediaItemsContainer'
import MediaItemPreview from './Elements/MediaItemPreview'
import MediaItemTools from './Elements/MediaItemsTools'

export default defineComponent({
    name: 'v-media-manager',

    mixins: [
        translator,
    ],

    components: {
        MediaToolbar,
        MediaBreadcrumbs,
        MediaItemsContainer,
        MediaItemPreview,
        MediaItemTools,
    },

    setup() {
        onMounted(() => {
            loadMediaItems().then()

            window.addEventListener('keyup', (event) => {
                window['Foundation'].$emit(EVENTS.KEYBOARD_EVENT_KEYUP, event)
            })
        })

        return {
            isLoading,
            currentLocation,
            isPreviewModeActive,
            hasActiveMediaTool,
            directoriesCount: computed((): number => mediaDirectories().length),
            filesCount: computed((): number => mediaFiles().length),
        }
    },

    template: `
        <div class="media-manager shadow-sm">
            <div class="media-manager-loading" v-if="isLoading"></div>

            <div class="media-manager-header">
                <MediaToolbar/>
                <MediaBreadcrumbs v-if=" ! hasActiveMediaTool"/>
            </div>

            <MediaItemTools/>

            <div class="media-manager-body" v-if=" ! hasActiveMediaTool">
                <MediaItemsContainer/>
                <MediaItemPreview v-if="isPreviewModeActive"/>
            </div>
            <div class="media-manager-footer" v-if=" ! hasActiveMediaTool">
                <span class="small">{{ trans('Total :count item(s)', {count: directoriesCount + filesCount}) }} | {{ trans(':count Directories', {count: directoriesCount}) }} - {{ trans(':count Files', {count: filesCount}) }}</span>
            </div>
        </div>
    `,
})
