import { defineComponent } from 'vue'
import request from '../../../mixins/request'

export default defineComponent({
    name: 'v-impersonated-user',

    props: {
        url: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },

    setup(props) {
        function stopImpersonating() {
            request()
                .post(props.url)
                .then((resp) => {
                    location.replace(resp.data.redirect)
                })
                .catch(() => {
                    location.reload()
                });
        }

        return {
            stopImpersonating,
        }
    },

    template: `
        <div class="impersonated" @click.prevent="stopImpersonating">
            <span class="impersonated-icon">
                <i class="fas fa-fw fa-mask"></i>
            </span>
            <span class="impersonated-content">{{ title }}</span>
        </div>
    `
})
