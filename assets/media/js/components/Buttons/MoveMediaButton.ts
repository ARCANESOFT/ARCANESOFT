import { defineComponent } from 'vue'
import { MEDIA_TOOLS } from '../../enums'
import mutations from '../../store/mutations'
import hasSelectedMedia from '../../computed/media/has-selected-items'
import translator from '../../mixins/translator'

export default defineComponent({
    name: 'v-move-media-button',

    mixins: [
        translator,
    ],

    setup() {
        return {
            hasSelectedMedia,
            move: (): void => {
                if (hasSelectedMedia.value)
                    mutations.setActiveMediaTool(MEDIA_TOOLS.MOVE_MEDIA)
            },
        }
    },

    template: `
        <button @click.prevent="move" type="button"
                :title="trans('Move')" :disabled=" ! hasSelectedMedia"
                class="btn btn-primary">
            <i class="fas fa-fw fa-dolly"></i>
        </button>
    `,
})
