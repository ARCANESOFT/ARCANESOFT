import { defineComponent, PropType, reactive } from 'vue'

type BasicMetaType = {
    title?: string|null,
    description?: string|null,
    keyword?: string|null,
}

export default defineComponent({
    name: 'v-seo-metas-basic',
    props: {
        value: {
            type: Object as PropType<BasicMetaType>,
            default: () => ({}),
        },
    },
    setup(props) {
        const metas = reactive<BasicMetaType>(props.value ?? {})

        return {
            metas,
        }
    },
    template: `
        <div class="row row-cols-1 g-3">
            <div class="col">
                <label for="metas[basic][title]" class="form-label">Title</label>
                <input type="text" id="metas[basic][title]" name="metas[basic][title]" :value="metas.title"
                       class="form-control" placeholder="Title">
            </div>
            <div class="col">
                <label for="metas[basic][description]" class="form-label">Description</label>
                <textarea id="metas[basic][description]" name="metas[basic][description]" :value="metas.description"
                    class="form-control"  rows="3"></textarea>
            </div>
            <div class="col">
                <label for="metas[basic][keywords]" class="form-label">Keywords</label>
                <input type="text" id="metas[basic][keywords]" name="metas[basic][keywords]" :value="metas.keyword"
                       class="form-control" placeholder="Keywords">
            </div>
        </div>
    `,
})
