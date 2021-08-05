import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue'
import { Editor, EditorOptions } from '@toast-ui/editor'
import { EditorType, EventMap, PreviewStyle } from '@toast-ui/editor/types/editor'
import arcanesoft from '../../../../helpers/arcanesoft'
import { SKIN_MODE } from '../../../../emuns'
import skinMode from '../../../store/modules/skin-mode'
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
            type: String as PropType<EditorType>,
            default: 'markdown',
        },

        previewStyle: {
            type: String as PropType<PreviewStyle>,
            default: 'vertical',
        },

        height: {
            type: String,
            default: '300px',
        },
    },

    setup(props) {
        const tuiEditorRef = ref<HTMLElement>(null)
        const editor = ref<Editor|null>(null)
        const markdown = ref(null)
        const arc = arcanesoft()
        const { isDarkMode } = skinMode()

        const editorEvents: EventMap = {
            load: (editor) => {
                arc.emit('tui.editor.load', {editor})
            },
            blur: (event) => {
                arc.emit('tui.editor.blur', {editor: editor.value, event})
            },
            change: (event) => {
                arc.emit('tui.editor.change', {editor: editor.value, event})
            },
            focus: (event) => {
                arc.emit('tui.editor.focus', {editor: editor.value, event})
            },
            caretChange: (event: EditorType) => {
                arc.emit('tui.editor.input', {editor: editor.value, event})
            },
        }

        onMounted((): void => {
            const options: EditorOptions = {
                ...defaultOptions,
                ...{
                    el: tuiEditorRef.value,
                    initialEditType: props.initialEditType,
                    previewStyle: props.previewStyle,
                    height: props.height,
                    initialValue: props.value || '',
                    events: editorEvents,
                    theme: isDarkMode.value ? 'dark' : 'default'
                }
            }

            editor.value = new Editor(options)

            editor.value.on('change', (): void => {
                markdown.value = editor.value.getMarkdown()
            })

            editor.value.on('addImageBlobHook', (blob: Blob, callback: Function): void => {
                const reader = new FileReader

                reader.onload = (event) => {
                    callback(event.target.result, '')
                }

                reader.readAsDataURL(blob)
            })

            arc.on('foundation.ui.skin', ({mode}): void => {
                const elt = tuiEditorRef.value.querySelector('div.toastui-editor-defaultUI')
                if (mode === SKIN_MODE.LIGHT)
                    return elt.classList.remove('toastui-editor-dark')

                if ( ! elt.classList.contains('toastui-editor-dark'))
                    elt.classList.add('toastui-editor-dark')
            })
        })

        onUnmounted((): void => {
            Object.keys(editorEvents).forEach((event) => {
                editor.value.off(event)
            })

            editor.value.destroy()
        })

        return {
            tuiEditorRef,
            markdown,
        }
    },

    template: `
        <div>
            <input type="hidden" :name="name" :value="markdown">
            <div ref="tuiEditorRef"></div>
        </div>
    `,
})
