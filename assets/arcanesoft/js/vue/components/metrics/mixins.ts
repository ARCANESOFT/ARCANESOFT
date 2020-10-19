import config from './config'
import request from '../../../mixins/request'

export default {
    props: {
        metric: {
            type: Object,
            required: true,
        },
    },

    data: (): Object => ({
        loading: true,
        allowed: true,
        result: {},
    }),

    methods: {
        fetch(metric, options = {}): Promise<any> {
            this.loading = true;

            return request()
                .post(config.endpoint, {
                    ...options,
                    metric: metric
                })
                .then((response) => {
                    this.result  = response.data
                    this.loading = false

                    return response;
                })
                .catch(({response}) => {
                    if (response && response.status === 403)
                        this.allowed = false

                    this.loading = false
                })
        }
    },

    computed: {
        isLoading(): boolean {
            return this.loading
        },

        isReady(): boolean {
            return ! this.isLoading
        },

        isAllowed(): boolean {
            return this.allowed
        },

        isNotAllowed(): boolean {
            return ! this.isAllowed
        },
    },
}
