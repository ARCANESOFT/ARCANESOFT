import {computed, defineComponent, ref} from 'vue'

type Pages = {
    key: string,
    name: string,
    placeholders: Array<string>
}

export default defineComponent({
    name: 'v-seo-footer-placeholders',

    props: {
        'page': {
            type: Number,
            default: null
        },
        'pages': {
            type: Object as () => Array<Pages>,
            required: true
        },
        'value': {
            type: Object,
            default: {}
        }
    },

    setup(props) {
        const pagesOptions = computed(() => props.pages.map((page) => ({
            key: page.key,
            value: page.name,
        })))

        const selectedPage = ref(props.page || pagesOptions.value[0].key || null)

        const placeholders = computed(
            () => props.pages.find((page) => page.key == selectedPage.value).placeholders
        )

        return {
            selectedPage,
            pagesOptions,
            placeholders,
        }
    },

    template: `
        <div class="row g-3">
            <div class="col-12">
                <label for="page" class="form-label font-weight-light text-uppercase text-muted">Page content</label>
                <select name="page" id="page" class="form-select" aria-label="Page" v-model="selectedPage">
                    <option v-for="option in pagesOptions" :value="option.key" v-text="option.value"></option>
                </select>
            </div>
            <div class="col-12">
                <label class="form-label font-weight-light text-uppercase text-muted">Placeholders</label>
                <div class="row g-3">
                    <div class="col-12" v-for="placeholder in placeholders">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1" v-text="placeholder"></span>
                            <input :name="'placeholders['+placeholder+']'" type="text" class="form-control"
                                   :value="value[placeholder] || null">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
