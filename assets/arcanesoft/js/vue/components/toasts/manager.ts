import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import ToastComponent from './toast-component'
import Toast from './toast'
import events from './events'
import arcanesoft from '../../../helpers/arcanesoft'

export default defineComponent({
    name: 'v-toasts-manager',

    components: {
        ToastComponent,
    },

    setup() {
        const toasts = ref([])

        function pushToast(type, title, body, options): void {
            toasts.value.push(
                Toast.make(
                    type, title, body, options.time || Date.now(), options.delay || 5000
                )
            )
        }

        function removeToast(toast: Toast): void {
            toasts.value = toasts.value.filter((t) => t.id !== toast.id)
        }

        onMounted(() => {
            arcanesoft().$on(events.UI_TOASTS_NOTIFY, ({type, title, body, options}) => {
                pushToast(type, title, body, options || {})
            })

            arcanesoft().$on(events.UI_TOASTS_HIDDEN, (toast) => {
                removeToast(toast)
            })
        })

        onUnmounted(() => {
            arcanesoft().$off(events.UI_TOASTS_NOTIFY)
            arcanesoft().$off(events.UI_TOASTS_HIDDEN)
        })

        return {
            toasts,
        }
    },

    template: `
        <div class="toasts-container">
            <ToastComponent v-for="toast in toasts" :key="toast.id" :toast="toast" />
        </div>
    `,
})
