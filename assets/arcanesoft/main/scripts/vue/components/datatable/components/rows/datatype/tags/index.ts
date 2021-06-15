import { computed, defineComponent, PropType } from 'vue'
import { DatatableRowColumn } from '../../../../types'
import { DatatypeTags } from '../../../../types/column-datatype'

export default defineComponent({
    name: 'v-dt-row-col-tags',

    props: {
        rowColumn: {
            type: Object as PropType<DatatableRowColumn>,
            required: true,
        },
    },

    setup(props) {
        const tags = computed<DatatypeTags>(() => <DatatypeTags> props.rowColumn.value)

        return {
            tags,
        }
    },

    template: `
        <span v-for="tag in tags"
              class="v-dt-datatype-tag" :class="['v-dt-datatype-tag-'+tag.color]"
              v-html="tag.label"></span>
    `,
})
