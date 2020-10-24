import { defineComponent, reactive, ref, onMounted, onUnmounted } from 'vue'
import { MediaItem } from '../types'
import selectedMediaItems from '../store/modules/selected-media-items'
import { trans } from '../helpers/translator'

import MediaToolbar from './elements/media-toolbar'
import MediaBreadcrumbs from './elements/media-breadcrumbs'
import MediaItemsContainer from './elements/media-items-container'

export default defineComponent({
    name: 'v-media-browser',

    props: {
        name: {
            type: String,
            required: true,
        },

        id: {
            type: String,
            default: null,
        },

        value: {
            type: String,
            default: null,
        },

        inputClass: {
            type: String,
            default: null,
        },

        multiple: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        MediaToolbar,
        MediaBreadcrumbs,
        MediaItemsContainer,
    },

    setup(props) {
        const { items: selectedItems } = selectedMediaItems()

        const urls = ref(null)
        const modalRef = ref(null)
        const modal = reactive({
            elt: null,
            isOpen: false,
        })

        onMounted(() => {
            urls.value = props.value
            modal.elt = window['twbs'].Modal.make(modalRef.value)
                .on('hidden', (): void => { modal.isOpen = false })
                .on('shown', (): void => { modal.isOpen = true })
        })

        onUnmounted((): void => {
            modal.elt.hide()
            modal.elt.dispose()
        })

        const openBrowser = (): void => {
            modal.elt.show()
        }

        const select = (): void => {
            urls.value = selectedItems.value.map((item: MediaItem) => item.url).join(', ')

            modal.elt.hide()
        }

        return {
            trans,
            urls,
            modalRef,
            modal,
            openBrowser,
            select,
        }
    },

    template: `
        <div class="input-group">
            <input type="text" v-model="urls" :name="name" :id="id || name" class="form-control" :class="this.inputClass"
                   aria-label="Browse Media Items" aria-describedby="browse-medias-button">
            <button @click="openBrowser" id="browse-medias-button"
                    class="btn btn-outline-secondary" type="button">{{ trans('Browse') }}</button>
        </div>

        <teleport to="body">
            <div ref="modalRef" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div v-if="modal.isOpen" class="media-browser">
                                <div class="media-manager-header">
                                    <MediaToolbar :readonly="true"/>
                                    <MediaBreadcrumbs/>
                                </div>
                                <div class="media-manager-body">
                                    <MediaItemsContainer selection="files" :multiple="multiple" :readonly="true"/>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            <button type="button" data-dismiss="modal"
                                    class="btn btn-outline-secondary">{{ trans('Close') }}</button>
                            <button type="button" @click.prevent="select"
                                    class="btn btn-primary">{{ trans('Select') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    `,
})
