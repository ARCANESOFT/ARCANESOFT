import { defineComponent, onMounted, ref } from 'vue'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'

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

    setup(props) {
        const tuiViewerRef = ref<HTMLElement>()
        const viewer = ref<Viewer>()

        onMounted((): void => {
            const options = {
                el: tuiViewerRef.value,
                height: props.height,
                initialValue: props.value,
                viewer: true,
            }

            viewer.value = new Viewer(options)
        })

        return {
            tuiViewerRef,
        }
    },

    template: `<div ref="tuiViewerRef"></div>`
})

