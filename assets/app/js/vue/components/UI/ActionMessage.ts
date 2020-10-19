import { defineComponent } from "vue"

export default defineComponent({
    props: {
        'on': {
            type: String,
            required: true,
        },
    },

    data: () => ({
        shown: false,
        timeout: null,
        listener: null,
    }),

    mounted() {
        this.listener = () => {
            this.show()
        }

        document.addEventListener(this.on, this.listener)
    },

    destroyed() {
        document.removeEventListener(this.on, this.listener)
    },

    methods: {
        show() {
            clearTimeout(this.timeout);
            this.shown = true
            this.timeout = setTimeout(() => {
                this.shown = false
            }, 2000)
        }
    },
    computed: {
        attributes() {
            const allowed = ['class'];

            return Object.keys(this.$attrs)
                .filter(key => allowed.includes(key))
                .reduce((obj, key) => {
                    obj[key] = this.$attrs[key];
                    return obj;
                }, {});
        },
    },

    template: `
        <transition name="fade">
            <span v-bind="attributes" v-show="shown"><slot>Saved.</slot></span>
        </transition>
    `
});
