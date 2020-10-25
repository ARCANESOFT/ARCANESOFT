import { defineComponent, onMounted, onUnmounted, reactive, ref, watch, nextTick } from 'vue'
import arcanesoft from '../../../helpers/arcanesoft'
import debounce from '../../../helpers/debounce'
import Component from './component'
import morphdom from 'morphdom'
import { COMPONENT_ACTION_EVENT, COMPONENT_RELOAD_EVENT } from './events'

export default defineComponent({
    name: 'v-datatable',

    props: {
        name: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            default: {},
        },
    },

    setup(props) {
        let component = reactive<Component>(new Component(props.name, props.data))

        let loading = ref(false)
        let actions = ref([])
        let dom = ref(null)

        const fetch = (params: Object = {}): void => {
            loading.value = true

            arcanesoft()
                .request()
                .post('/admin/api/components', {
                    ...params,
                    component: component.toArray()
                })
                .then(({status, data}) => {
                    if (status !== 200)
                        return

                    component.setData(data.data)
                    morphdom(dom.value, data.html)

                    nextTick().then(() => {
                        component.scan(dom.value)
                        arcanesoft().bootComponents(dom.value)
                    })

                    actions.value = []
                })
                .finally(() => {
                    loading.value = false
                })
        }

        const onActionEvent = ({component: target, action}) => {
            if (target.name === props.name)
                actions.value.push(action)
        }

        const onReloadEvent = (name: string) => {
            if (component.name === name)
                fetch()
        }

        onMounted(() => {
            fetch()

            arcanesoft()
                .on(COMPONENT_ACTION_EVENT, onActionEvent)
                .on(COMPONENT_RELOAD_EVENT, onReloadEvent)
        })

        onUnmounted(() => {
            arcanesoft()
                .off(COMPONENT_ACTION_EVENT, onActionEvent)
                .off(COMPONENT_RELOAD_EVENT, onReloadEvent)
        })

        watch(actions, debounce(() => {
            if (actions.value.length > 0)
                fetch({actions: actions.value})
        }, 500), {deep: true, immediate: false})

        return {
            component,
            dom,
            loading,
        }
    },

    template: `
        <div class="datatable" :class="{'datatable-loading': loading}">
            <div ref="dom">
                <div class="card card-borderless shadow-sm">
                    <div class="card-header">Loading&hellip;</div>
                    <div class="card-body d-flex justify-content-center">
                        <div class="spinner-border" role="status"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
