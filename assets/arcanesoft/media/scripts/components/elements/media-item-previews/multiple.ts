import { defineComponent, computed, PropType } from 'vue'
import { MediaItems } from '../../../types'

export default defineComponent({
    name: 'v-media-item-preview-multiple',

    props: {
        items: {
            type: Array as PropType<MediaItems>,
            required: true,
        },
    },

    setup: (props) => ({
        total: computed<number>(() => props.items.length),
    }),

    template: `
        <div class="item-preview-icon d-flex justify-content-center">
            <div class="fa-layers fa-fw fa-5x">
                <i class="fas fa-clone"></i>
                <span class="fa-layers-counter bg-primary">{{ total }}</span>
            </div>
        </div>

        <div class="p-2 bg-white">
            <ul class="pl-4 mb-0" style="word-break: break-all;">
                <li v-for="item in items" :key="item.path">{{ item.name }}</li>
            </ul>
        </div>
    `,
})
