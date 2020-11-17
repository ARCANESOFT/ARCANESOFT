import { defineComponent, computed, PropType } from 'vue'
import { DatatableRowColumn } from '../../../../types'
import { DatatypeDetails } from '../../../../types/column-datatype'

export default defineComponent({
    name: 'v-dt-row-col-description-list',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    setup(props) {
        const details = computed<DatatypeDetails>(() => <DatatypeDetails> props.rowColumn.value)

        return {
            details,
        }
    },

    template: `
        <dl class="mb-0">
            <template v-for="detail in details">
                <dt>{{ detail.term }}</dt>
                <dd class="mb-0">{{ detail.description }}</dd>
            </template>
        </dl>
    `,
})
