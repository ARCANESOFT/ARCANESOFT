import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import translator from '../../../mixins/translator'
// import { Modal } from 'bootstrap/dist/js/bootstrap.esm.js'
import Modal from 'bootstrap/js/src/modal.js'

export default defineComponent({
    name: 'v-modal',

    props: {
        show: {
            type: Boolean,
            default: false,
        },

        options: {
            type: Object,
            default: () => ({}),
        },
    },

    emits: [
        'closed',
    ],

    setup(props, ctx) {
        const { trans } = translator()

        let modal
        const modelRef = ref<any>(null)

        const close = () => {
            modal.hide()
            ctx.emit('closed')
        }

        const onModalClosed = () => {
            close()
        }

        watch(() => props.show, (value, prevValue) => {
            if (value === false)
                console.log('Now you need to close the modal')
        })

        onMounted(() => {
            modal = new Modal(modelRef.value, props.options)
            modal._element.addEventListener('hidden.bs.modal', onModalClosed)
            modal.show()
        })

        onUnmounted(() => {
            modal._element.removeEventListener('hidden.bs.modal', onModalClosed)
        })

        return {
            modelRef,
            close,
            trans,
        }
    },

    template: `
        <teleport to="body">
            <div ref="modelRef" class="modal fade" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel">
                                <slot name="title"></slot>
                            </h5>
                            <button type="button" class="btn-close" data-dismiss="modal" :aria-label="trans('Close')"></button>
                        </div>
                        <div class="modal-body">
                            <slot name="body"></slot>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    `,
})
