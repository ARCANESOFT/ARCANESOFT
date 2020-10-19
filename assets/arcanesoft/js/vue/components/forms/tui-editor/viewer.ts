import { defineComponent } from 'vue'
import Editor from '@toast-ui/editor'

export default defineComponent({
    name: 'v-markdown-viewer',

    props: {
        value: {
            type: String,
            default: null,
        },

        height: {
            type: String,
            default: '300px',
        },
    },

    mounted(): void {
        const options = {
            ...{
                el: this.$refs.tuiViewer,
                height: this.height,
                initialValue: this.value,
                viewer: true,
            },
        }

        this.editor = Editor.factory(options)
    },

    template: `<div ref="tuiViewer"></div>`
})

