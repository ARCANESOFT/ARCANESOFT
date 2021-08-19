import { defineComponent, onMounted, reactive, ref, computed } from 'vue'

export default defineComponent({
    name: 'v-rating-input',

    props: {
        name: {
            type: String,
            required: false,
            default: 'rating',
        },

        value: {
            default: null,
        },

        max: {
            type: Number,
            required: false,
            default: 5,
        },

        icon: {
            type: String,
            required: false,
            default: 'fa fa-fw fa-star',
        },

        readonly: {
            type: Boolean,
            required: false,
            default: false,
        },

        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    setup(props) {
        const ratings = ref(
            Array.from({length: props.max}, (x, i) => i+1)
        )
        const selected = reactive({
            current: null,
            old: null,
        })

        onMounted(() => {
            selected.current = props.value
        })

        const ratingClasses = computed((): Function => (rating) => ({
            'is-selected': (selected.current >= rating) && selected.current != null,
            'is-disabled': props.disabled,
        }))

        function select(value): void {
            if ( ! props.disabled) {
                selected.current = value
                selected.old = value
            }
        }

        function starOver(value): void {
            if (props.disabled)
                return

            selected.old = selected.current
            selected.current = value
        }

        function starOut(): void {
            if (props.disabled)
                return

            selected.current = selected.old
        }

        return {
            ratings,
            selected,
            ratingClasses,

            select,
            starOver,
            starOut,
        }
    },

    template: `
        <div class="rating-control">
            <label v-for="rating in ratings"
                   @click.prevent="select(rating)" @mouseover="starOver(rating)" @mouseout="starOut"
                   class="rating-label" :class="ratingClasses(rating)">
                <input type="radio" class="rating-control-input"
                       v-model="selected.current"
                       :value="rating" :id="name+'-'+rating" :name="name"
                       :disabled="disabled" :readonly="readonly">
                <i :class="icon"></i>
            </label>
        </div>
    `,
})
