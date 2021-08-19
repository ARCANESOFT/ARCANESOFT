import { defineComponent, PropType, ref } from 'vue'
import SeoBasicMetas from './basic'
import SeoTwitterCardMetas from './twitter-card'
import SeoOpenGraphMetas from './open-graph'

type MetaValueType = {
    basic?: Object,
    twitter?: Object,
    openGraph?: Object,
}

export default defineComponent({
    name: 'v-seo-metas',
    props: {
        value: {
            type: Object as PropType<MetaValueType>,
            default: () => ({}),
        },
    },
    components: {
        SeoBasicMetas,
        SeoTwitterCardMetas,
        SeoOpenGraphMetas,
    },
    setup(props) {
        const metas = ref<MetaValueType>(props.value ?? {})

        return {
            metas,
        }
    },
    template: `
        <h3>Metas</h3>
        <div class="card">
            <div class="card-header pb-0 border-bottom-0">
                <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="basic-tab"
                                data-bs-toggle="tab" data-bs-target="#basic" type="button" role="tab" aria-controls="basic" aria-selected="true">Basic</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="twitter-card-tab"
                                data-bs-toggle="tab" data-bs-target="#twitter-card" type="button" role="tab" aria-controls="twitter-card" aria-selected="false">Twitter Card</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="open-graph-tab"
                                data-bs-toggle="tab" data-bs-target="#open-graph" type="button" role="tab" aria-controls="open-graph" aria-selected="false">Open Graph</button>
                    </li>
                </ul>
            </div>
            <div class="card-body tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                    <SeoBasicMetas :value="metas.basic ?? {}"/>
                </div>
                <div class="tab-pane fade" id="twitter-card" role="tabpanel" aria-labelledby="twitter-card-tab">
                    <SeoTwitterCardMetas :value="metas.twitter ?? {}"/>
                </div>
                <div class="tab-pane fade" id="open-graph" role="tabpanel" aria-labelledby="open-graph-tab">
                    <SeoOpenGraphMetas :value="metas.openGraph ?? {}"/>
                </div>
            </div>
        </div>
    `,
})
