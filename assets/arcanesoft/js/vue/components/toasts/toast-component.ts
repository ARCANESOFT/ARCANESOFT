import { defineComponent, onMounted, ref, computed, PropType } from 'vue'
import arcanesoft from '../../../helpers/arcanesoft'
import { Toast } from 'bootstrap/js/index.esm'
import * as moment from 'moment'
import ToastClass from './toast'
import events from './events'
import Types from './types'

export default defineComponent({
    props: {
        toast: {
            type: Object as PropType<ToastClass>,
            required: true,
        },
    },

    setup(props) {
        const toastRef = ref(null)

        onMounted((): void => {
            new Toast(toastRef.value, {
                animation: true,
                autohide: false,
                delay: props.toast.delay
            }).show()

            toastRef.value.addEventListener('hidden.bs.toast', () => {
                arcanesoft().emit(events.UI_TOASTS_HIDDEN, props.toast)
            })
        })

        const toastClasses = computed<string>(() => {
            let classes: string[] = [];

            if (Object.values(Types).includes(props.toast.type))
                classes.push(`toast-${props.toast.type}`)

            return classes.join(' ')
        })

        const formattedTime = computed<string>(() => {
            return moment(props.toast.time).fromNow()
        })

        return {
            toastRef,
            toastClasses,
            formattedTime,
        }
    },
    template: `
        <div ref="toastRef" role="alert" aria-live="assertive" aria-atomic="true"
             class="toast" :class="toastClasses">
            <div class="toast-header">
                <strong class="mr-auto">{{ toast.title }}</strong>
                <button type="button" class="btn-close" data-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" v-if="toast.body" v-html="toast.body"></div>
            <div class="toast-footer d-flex align-items-center">
                <small class="text-muted">{{ formattedTime }}</small>
            </div>
        </div>
    `,
})
