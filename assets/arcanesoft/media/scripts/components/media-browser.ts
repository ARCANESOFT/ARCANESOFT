import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { MediaItem } from '../types'
import { useGetters } from '../store'
import { trans } from '../helpers/translator'
import useModal from '@arcanesoft/main/scripts/components/modal'

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
        const { selectedItems } = useGetters()

        const urls = ref(null)

        const modalRef = ref<HTMLElement>(null)
        const isOpen = ref<boolean>(false)
        const modal = ref<any>(null)

        onMounted((): void => {
            urls.value = props.value

            modal.value = useModal(modalRef.value)
                .on('hidden', (): void => { isOpen.value = false })
                .on('shown', (): void => { isOpen.value = true })
        })

        onUnmounted((): void => {
            modal.value.hide()
            modal.value.dispose()
        })

        const onBrowseClick = (): void => {
            modal.value.show()
        }

        const onSelectClick = (): void => {
            urls.value = selectedItems.value.map((item: MediaItem) => item.url).join(', ')

            modal.value.hide()
        }

        return {
            trans,
            urls,
            modal,
            modalRef,
            isOpen,
            onBrowseClick,
            onSelectClick,
        }
    },

    template: `
        <div class="input-group">
            <input type="text" v-model="urls" :name="name" :id="id || name" class="form-control" :class="this.inputClass"
                   aria-label="Browse Media Items" aria-describedby="browse-medias-button">
            <button @click.prevent="onBrowseClick" id="browse-medias-button"
                    class="btn btn-outline-secondary" type="button">{{ trans('Browse') }}</button>
        </div>

        <teleport to="body">
            <div ref="modalRef" class="modal fade"
                 data-backdrop="static" data-keyboard="false" tabindex="-1"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div v-if="isOpen" class="media-browser">
                                <div class="media-manager-header mb-3">
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
                            <button type="button" @click.prevent="onSelectClick"
                                    class="btn btn-primary">{{ trans('Select') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    `,
})
