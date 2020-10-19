import { defineComponent, onMounted, ref, watch, nextTick } from 'vue'
import Component from './component'
import morphdom from 'morphdom'
import debounce from '../../../helpers/debounce'

export default defineComponent({
    name: 'v-datatable',

    props: {
        name: {
            type: String,
            required: true,
        },
    },

    setup(props, ctx) {
        let loading = ref(false)
        let component = ref(null)
        let actions = ref([])
        let dom     = ref(null)

        function fetch(params: Object = {}): void {
            loading.value = true

            window['request']()
                .post('/admin/api/components', {
                    ...params,
                    component: component.value.toArray()
                })
                .then((response) => {
                    if (response.status === 200) {
                        component.value.setData(response.data.data)
                        morphdom(dom.value, response.data.html)

                        nextTick().then(() => {
                            component.value.scan(dom.value)
                            window['Foundation'].initComponents(dom.value)
                        })

                        actions.value = []
                    }
                })
                .finally(() => {
                    loading.value = false
                })
        }

        onMounted(() => {
            component.value = new Component(props.name, ctx.attrs)

            fetch()

            window['Foundation'].$on('arcanesoft::components.action', ({component, action}) => {
                if (component.name === props.name)
                    actions.value.push(action)
            })
        })

        watch(actions, debounce(() => {
            if (actions.value.length > 0)
                fetch({actions: actions.value})
        }, 500), {deep: true, immediate: false})

        return {
            actions,
            dom,
            loading,
        }
    },

    template: `
        <div ref="dom">
            <div class="card card-borderless shadow-sm">
                <div class="card-header">Loading&hellip;</div>
                <div class="card-body d-flex justify-content-center">
                    <div class="spinner-border" role="status"></div>
                </div>
            </div>
        </div>
    `,
})
