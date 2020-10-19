import { defineComponent, computed, PropType } from 'vue'
import { MediaItem } from '../../../types'

export default defineComponent({
    name: 'v-media-preview-multiple-items',

    props: {
        items: {
            type: Array as PropType<MediaItem[]>,
            required: true,
        },
    },

    setup(props) {
        return {
            total: computed((): number => props.items.length)
        }
    },

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
