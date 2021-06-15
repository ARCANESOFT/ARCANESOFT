import {computed, defineComponent, ref} from 'vue'

type Pages = {
    key: number,
    name: string,
    placeholders: Array<string>
}
type PageOptions = {
    key: number,
    value: string,
}

export default defineComponent({
    name: 'v-seo-footer-placeholders',

    props: {
        page: {
            type: Number,
            default: null
        },
        pages: {
            type: Object as () => Array<Pages>,
            required: true
        },
        value: {
            type: Object,
            default: (): Object => ({})
        }
    },

    setup(props) {
        const pagesOptions = computed<PageOptions[]>(() => props.pages.map((page): PageOptions => ({
            key: page.key,
            value: page.name,
        })))

        const selectedPage = ref<number|null>(props.page || pagesOptions.value[0].key || null)

        const placeholders = computed<string[]>(
            () => props.pages.find((page) => page.key == selectedPage.value).placeholders
        )

        return {
            selectedPage,
            pagesOptions,
            placeholders,
        }
    },

    template: `
        <div class="row row-cols-1 g-3">
            <div class="col">
                <label for="page" class="form-label font-weight-light text-uppercase text-muted">Page content</label>
                <select name="page" id="page" class="form-select" aria-label="Page" v-model="selectedPage">
                    <option v-for="option in pagesOptions" :value="option.key" v-text="option.value"></option>
                </select>
            </div>
            <div class="col">
                <label class="form-label font-weight-light text-uppercase text-muted">Placeholders</label>
                <div class="row row-cols-1 g-3">
                    <div class="col" v-for="placeholder in placeholders">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1" v-text="placeholder"></span>
                            <input :name="'placeholders['+placeholder+']'" type="text" class="form-control"
                                   :value="value?.[placeholder] || ''">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
