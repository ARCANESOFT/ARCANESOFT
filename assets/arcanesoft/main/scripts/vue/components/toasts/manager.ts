import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import arcanesoft from '../../../helpers/arcanesoft'
import ToastComponent from './toast-component'
import Toast from './toast'
import events from './events'

export default defineComponent({
    name: 'v-toasts-manager',

    components: {
        ToastComponent,
    },

    setup() {
        const toasts = ref([])

        const pushToast = ({type, title, body, options: {time, delay}}): void => {
            toasts.value.push(
                Toast.make(
                    type, title, body, time || Date.now(), delay || 5000
                )
            )
        }

        const removeToast = (toast: Toast): void => {
            toasts.value = toasts.value.filter((t) => t.id !== toast.id)
        }

        onMounted(() => {
            arcanesoft()
                .on(events.UI_TOASTS_NOTIFY, pushToast)
                .on(events.UI_TOASTS_HIDDEN, removeToast)
        })

        onUnmounted(() => {
            arcanesoft()
                .off(events.UI_TOASTS_NOTIFY, pushToast)
                .off(events.UI_TOASTS_HIDDEN, removeToast)
        })

        return {
            toasts,
        }
    },

    template: `
        <teleport to="body">
            <div class="toasts-container">
                <ToastComponent v-for="toast in toasts" :key="toast.id" :toast="toast" />
            </div>
        </teleport>
    `,
})
