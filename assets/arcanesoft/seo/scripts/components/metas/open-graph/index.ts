import { defineComponent, PropType, reactive } from 'vue'

type OpenGraphMetaType = {
    //
}

export default defineComponent({
    name: 'v-seo-metas-open-graph',
    props: {
        value: {
            type: Object as PropType<OpenGraphMetaType>,
            default: () => ({}),
        },
    },
    setup(props) {
        const metas = reactive<OpenGraphMetaType>(props.value)

        return {
            metas,
        }
    },
    template: `
        <div class="row row-cols-1 g-3">
            <div class="col">
            </div>
        </div>
    `,
})
