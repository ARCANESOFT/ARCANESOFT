import { defineComponent, onMounted, computed, PropType } from 'vue'
import * as moment from 'moment'
import Toast from './toast'
import Types from './types'

export default defineComponent({
    props: {
        toast: {
            type: Object as PropType<Toast>,
            required: true,
        },
    },

    setup(props) {
        onMounted(() => {
            // TODO: Replace with vanilla javascript
            // window['$'](this.$el).toast('show').on('hidden.bs.toast', () => {
            //     arcanesoft().$emit(events.UI_TOASTS_HIDDEN, props.toast)
            // })
        })

        const toastClasses = computed((): string => {
            let classes: string[] = [];

            if (Object.values(Types).includes(props.toast.type))
                classes.push(`toast-${props.toast.type}`)

            return classes.join(' ')
        })

        const formattedTime = computed((): string => {
            return moment(props.toast.time).fromNow()
        })

        return {
            toastClasses,
            formattedTime,
        }
    },
    template: `
        <div class="toast fade" :class="toastClasses"
             role="alert" aria-live="assertive" aria-atomic="true" :data-delay="toast.delay">
            <div class="toast-header">
                <strong class="mr-auto">{{ toast.title }}</strong>
                <button type="button" class="ml-2 mb-1 close" aria-label="Close" data-dismiss="toast">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body" v-if="toast.body" v-html="toast.body"></div>
            <div class="toast-footer">
                <small class="text-muted">{{ formattedTime }}</small>
            </div>
        </div>
    `,
})
