import { defineComponent } from 'vue'
import {trans as transMixin} from '../../../mixins'

export default defineComponent({
    mixins: [transMixin],

    props: {
        action: {
            type: String,
            required: true,
        },
    },

    data: () => ({
        recovery: false,
        csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    }),

    methods: {
        toggleToCode() {
            this.recovery = false;

            this.$nextTick(() => {
                this.$refs.code.focus()
            })
        },

        toggleToRecovery() {
            this.recovery = true;

            this.$nextTick(() => {
                this.$refs.recovery_code.focus()
            })
        }
    },

    template: `
        <div class="card shadow-sm">
            <h4 class="card-header text-center">{{ __("Two Factor Authentication") }}</h4>
            <div class="card-body">
                <div class="mb-4 small text-gray" v-if="recovery">
                    {{ __("Please confirm access to your account by entering one of your emergency recovery codes.") }}
                </div>
                <div class="mb-4 small text-gray" v-else>
                    {{ __("Please confirm access to your account by entering the authentication code provided by your authenticator application.") }}
                </div>
                <form :action="action" method="POST">
                    <input type="hidden" name="_token" :value="csrf">

                    <div class="row g-3">
                        <div class="col-lg-12" v-if="recovery">
                            <div class="form-label-group">
                                <input type="text" id="recovery_code" name="recovery_code" ref="recovery_code"
                                       class="form-control" autofocus autocomplete="one-time-code">
                                <label for="recovery_code">{{ __("Recovery Code") }}</label>
                            </div>
                        </div>

                        <div class="col-lg-12" v-else>
                            <div class="form-label-group">
                                <input type="text" id="code" name="code" ref="code"
                                       class="form-control" autofocus autocomplete="one-time-code">
                                <label for="code">{{ __("Code") }}</label>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <button v-if="recovery" @click="toggleToCode" type="button" class="btn btn-block btn-light">
                                {{ __("Use an authentication code") }}
                            </button>
                            <button v-else @click="toggleToRecovery" type="button" class="btn btn-block btn-light">
                                {{ __("Use a recovery code") }}
                            </button>
                            <button type="submit" class="btn btn-block btn-primary">{{ __("Login") }}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,
})
