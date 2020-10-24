import { defineComponent, onMounted, onUnmounted } from 'vue'
import { EVENTS } from '../enums'
import loading from '../store/modules/loading'
import location from '../store/modules/location'
import previewMode from '../store/modules/preview-mode'
import mediaTools from '../store/modules/media-tools'
import mediaItems from '../store/modules/media-items'
import arcanesoft from '@arcanesoft/core/src/helpers/arcanesoft';
import { trans } from '../helpers/translator'

import MediaToolbar from './elements/media-toolbar'
import MediaBreadcrumbs from './elements/media-breadcrumbs'
import MediaItemsContainer from './elements/media-items-container'
import MediaItemPreview from './elements/media-items-preview'
import MediaItemTools from './elements/media-items-tools'

export default defineComponent({
    name: 'v-media-manager',

    components: {
        MediaToolbar,
        MediaBreadcrumbs,
        MediaItemsContainer,
        MediaItemPreview,
        MediaItemTools,
    },

    setup() {
        const { isLoading } = loading()
        const { current: currentLocation } = location()
        const { hasActive: hasActiveMediaTool } = mediaTools()
        const { shown: isPreviewModeShown } = previewMode()
        const { directoriesCount, filesCount } = mediaItems()

        let keyUpListener = (event): void => {
            arcanesoft().emit(EVENTS.KEYBOARD_EVENT_KEYUP, event)
        }

        onMounted(() => {
            window.addEventListener('keyup', keyUpListener)
        })

        onUnmounted(() => {
            window.removeEventListener('keyup', keyUpListener)
        })

        return {
            trans,
            isLoading,
            currentLocation,
            isPreviewModeShown,
            hasActiveMediaTool,
            directoriesCount,
            filesCount,
        }
    },

    template: `
        <div class="media-manager card shadow-sm">
            <div class="media-manager-loading" v-if="isLoading"></div>

            <div class="media-manager-header card-header p-2">
                <MediaToolbar/>
                <MediaBreadcrumbs v-if=" ! hasActiveMediaTool"/>
            </div>

            <MediaItemTools v-if="hasActiveMediaTool"/>

            <div class="media-manager-body card-body p-0" v-if=" ! hasActiveMediaTool">
                <MediaItemsContainer/>
                <MediaItemPreview v-if="isPreviewModeShown"/>
            </div>

            <div class="media-manager-footer card-footer p-2" v-if=" ! hasActiveMediaTool">
                <span class="small">{{ trans('Total :count item(s)', {count: directoriesCount + filesCount}) }} | {{ trans(':count Directories', {count: directoriesCount}) }} - {{ trans(':count Files', {count: filesCount}) }}</span>
            </div>
        </div>
    `,
})
