import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { EVENTS } from '../../enums'
import config from '../../config'
import loading from '../../store/modules/loading'
import location from '../../store/modules/location'
import mediaTools from '../../store/modules/media-tools'
import mediaItems from '../../store/modules/media-items/actions'
import arcanesoft from '@arcanesoft/core/src/helpers/arcanesoft'
import { trans } from '../../helpers/translator'

import * as Core from '@uppy/core'
import * as Dashboard from '@uppy/dashboard'
import * as XhrUpload from '@uppy/xhr-upload'

export default defineComponent({
    name: 'v-media-files-uploader',

    setup() {
        const { handleLoading } = loading()
        const { current: currentLocation } = location()
        const { close: closeMediaTool } = mediaTools()
        const { loadItems: loadMediaItems } = mediaItems()

        const uppy = ref(null)
        const uploading = ref<boolean>(false)
        const filesUploaded = ref<boolean>(false)
        const uppyDashboardRef = ref(null)

        onMounted((): void => {
            const uppyOptions = {
                core: Object.assign({}, config.uppy.core, {
                    meta: {
                        location: currentLocation.value,
                    },
                }),
                dashboard: Object.assign({}, config.uppy.dashboard, {
                    target: uppyDashboardRef.value,
                }),
                xhr: Object.assign({}, config.uppy.xhr, {
                    endpoint: `${config.baseUrl}/upload`,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': arcanesoft().csrf(),
                    },
                }),
            }

            uppy.value = Core(uppyOptions.core)
                .use(Dashboard, uppyOptions.dashboard)
                .use(XhrUpload, uppyOptions.xhr)
                .on('upload', (): void => {
                    uploading.value = true
                })
                .on('complete', (): void => {
                    uploading.value = false
                    filesUploaded.value = true
                })

            arcanesoft().on(EVENTS.KEYBOARD_EVENT_KEYUP, (event): void => {
                if (event.code === 'Escape' && ! uploading.value)
                    closeMediaTool()
            })
        })

        onUnmounted(async (): Promise<void> => {
            if (uppy.value !== null) {
                uppy.value.close()
                uppy.value = null
            }

            if ( ! filesUploaded.value)
                return

            return handleLoading(async (): Promise<void> => await loadMediaItems())
        })

        return {
            trans,
            uppyDashboardRef,
        }
    },

    template: `
        <label class="checkbox-inline">
            <input type="checkbox" name="hash_name" id="hash-name" value="1"> {{ trans('Hash names') }}
        </label>

        <div ref="uppyDashboardRef" class="media-files-uploader"></div>
    `,
})
