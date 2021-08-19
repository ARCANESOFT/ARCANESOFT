import { defineComponent, PropType, ref, reactive } from 'vue'

type TwitterMetaType = {
    card: string,
    site?: string|null,
    creator?: string|null,
    title?: string|null,
    description?: string|null,
    keyword?: string|null,
    image?: string|null,
}

export default defineComponent({
    name: 'v-seo-metas-twitter',
    props: {
        value: {
            type: Object as PropType<TwitterMetaType>,
            default: () => ({}),
        },
    },
    setup(props) {
        const metas = reactive<TwitterMetaType>(props.value ?? {card: 'summary'})
        const twitterCards = ref([
            {
                key: 'summary',
                text: 'Summary',
            },
            {
                key: 'summary_large_image',
                text: 'Summary with large image',
            },
            {
                key: 'app',
                text: 'Application',
            },
            {
                key: 'player',
                text: 'Player',
            },
        ])
        const selectedCard = ref<string>(metas.card)

        return {
            metas,
            twitterCards,
            selectedCard,
        }
    },
    template: `
        <div class="row row-cols-1 g-3">
        <div class="col">
            <label for="metas[twitter][card]" class="form-label">Card</label>
            <select id="metas[twitter][card]" name="metas[twitter][card]" v-model="selectedCard"
                    class="form-select" aria-label="Twitter card type">
                <option v-for="(twitterCard, index) in twitterCards"
                        :value="twitterCard.key" v-text="twitterCard.text"
                        :selected="index === 0"/>
            </select>
        </div>
        <div class="col">
            <label for="metas[twitter][site]" class="form-label">Site</label>
            <input type="text" id="metas[twitter][site]" name="metas[twitter][site]" :value="value.site"
                   class="form-control" placeholder="@username">
        </div>
        <div class="col">
            <label for="metas[twitter][creator]" class="form-label">Creator</label>
            <input type="text" id="metas[twitter][creator]" name="metas[twitter][creator]" :value="value.creator"
                   class="form-control" placeholder="@creator">
        </div>
        <div class="col">
            <label for="metas[twitter][title]" class="form-label">Title</label>
            <input type="text" id="metas[twitter][title]" name="metas[twitter][title]" :value="value.title"
                   class="form-control" placeholder="Title">
        </div>
        <div class="col">
            <label for="metas[twitter][description]" class="form-label">Description</label>
            <textarea id="metas[twitter][description]" name="metas[twitter][description]" :value="value.description"
                      class="form-control" rows="3"></textarea>
        </div>
        <div class="col">
            <label for="metas[twitter][image]" class="form-label">Image</label>
            <input type="url" id="metas[twitter][image]" name="metas[twitter][image]" :value="value.image"
                   class="form-control" placeholder="Image">
        </div>
        </div>
    `,
})
