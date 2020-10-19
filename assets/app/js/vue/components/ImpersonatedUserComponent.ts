import { defineComponent } from 'vue'

export default defineComponent({
    props: [
        'url',
        'title',
    ],

    setup(props) {
        function stopImpersonating() {
            window['request']()
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
