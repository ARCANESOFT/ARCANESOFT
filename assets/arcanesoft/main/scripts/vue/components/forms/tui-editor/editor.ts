import { defineComponent } from 'vue'
import Editor from '@toast-ui/editor'
import defaultOptions from './config'

export default defineComponent({
    name: 'v-markdown-editor',

    props: {
        name: {
            type: String,
            required: true,
        },

        value: {
            type: String,
            default: null,
        },

        initialEditType: {
            type: String,
            default: 'markdown',
        },

        previewStyle: {
            type: String,
            default: 'vertical',
        },

        height: {
            type: String,
            default: '300px',
        },
    },

    data: (): Object => ({
        editor: null,
        rawContent: null,
    }),

    mounted() {
        this.editor = new Editor({
            ...defaultOptions,
            ...{
                el: this.$refs.tuiEditor,
                initialEditType: this.initialEditType,
                previewStyle: this.previewStyle,
                height: this.height,
                events: this.getEventsOptions(),
                initialValue: this.value,
            }
        })

        this.editor.on('change', (param) => {
            this.setValue(this.editor.getMarkdown())
        })

        this.editor.on('addImageBlobHook', (blob: Blob, callback: Function) => {
            const reader = new FileReader

            reader.onload = (event) => {
                callback(event.target.result, '')
            }

            reader.readAsDataURL(blob)
        })
    },

    methods: {
        setValue(value) {
            this.rawContent = value
        },

        getEventsOptions() {
            return {
                blur: (event) => {
                    this.$emit('tui.editor.blur', this.editor, event)
                },
                change: (event) => {
                    this.$emit('tui.editor.change', this.editor, event)
                },
                focus: (event) => {
                    this.$emit('tui.editor.focus', this.editor, event)
                },
                load: (editor) => {
                    this.$emit('tui.editor.load', editor)
                },
                stateChange: (event) => {
                    this.$emit('tui.editor.input', this.editor, event)
                },
            }
        },
    },

    destroyed() {
        Object.keys(this.getEventsOptions()).forEach((event) => {
            this.editor.off(event)
        })

        this.editor.remove()
    },

    template: `
            <div>
                <input type="hidden" :name="name" :value="rawContent">
                <div ref="tuiEditor"></div>
            </div>
        `,
})
