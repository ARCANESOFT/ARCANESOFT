import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { EVENTS } from '../../enums'
import config from '../../config'
import currentLocation from '../../store/getters/location/current-location'
import closeActiveMediaTool from '../../store/actions/tools/close-active-media-tool'
import loadMediaItems from '../../store/actions/media/load-media-items'
import translator from '../../mixins/translator'
import Csrf from '@arcanesoft/helpers/js/Utilities/Misc/Csrf'

import * as Core from '@uppy/core'
import * as Dashboard from '@uppy/dashboard'
import * as XhrUpload from '@uppy/xhr-upload'

export default defineComponent({
    name: 'v-media-files-uploader',

    mixins: [
        translator,
    ],

    setup() {
        const uppy = ref(null)
        const uploading = ref(false)
        const filesUploaded = ref(false)
        const uppyDashboardRef = ref(null)

        onMounted((): void => {
            const uppyOptions = {
                core: Object.assign({}, config.uppy.core, {
                    meta: {
                        location: currentLocation(),
                    },
                }),
                dashboard: {
                    target: uppyDashboardRef.value,
                    inline: true,
                    width: '100%',
                    height: 300,
                    replaceTargetContent: true,
                    showProgressDetails: true,
                    browserBackButtonClose: true,
                    proudlyDisplayPoweredByUppy: false,
                },
                xhr: {
                    endpoint: `${config.baseUrl}/upload`,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': Csrf.token(),
                    },
                    formData: true,
                    bundle: false,
                },
            }

            uppy.value = Core(uppyOptions.core)
                .use(Dashboard, uppyOptions.dashboard)
                .use(XhrUpload, uppyOptions.xhr)
                .on('upload', (data) => {
                    uploading.value = true
                })
                .on('complete', (result) => {
                    uploading.value = false
                    filesUploaded.value = true
                })

            window['Foundation'].$on(EVENTS.KEYBOARD_EVENT_KEYUP, (event) => {
                if (event.code === 'Escape' && ! uploading.value)
                    closeActiveMediaTool()
            })
        })

        onUnmounted(() => {
            if (uppy.value !== null) {
                uppy.value.close()
                uppy.value = null
            }

            if (filesUploaded.value)
                loadMediaItems().then()
        })

        return {
            uppyDashboardRef,
        }
    },

    template: `
        <div>
            <label class="checkbox-inline">
                <input type="checkbox" name="hash_name" id="hash-name" value="1"> {{ trans('Hash names') }}
            </label>

            <div ref="uppyDashboardRef" class="media-files-uploader"></div>
        </div>
    `,
})
