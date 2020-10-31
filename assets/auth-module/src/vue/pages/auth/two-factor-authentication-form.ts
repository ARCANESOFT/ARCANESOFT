import { defineComponent, onMounted, nextTick, ref } from 'vue'
import Csrf from '@arcanesoft/core/src/helpers/csrf'
import translator from '../../../mixins/translator'

export default defineComponent({
    name: 'v-page-auth-two-factor-authentication-form',

    props: {
        action: {
            type: String,
            required: true,
        },
    },

    setup() {
        const { trans } = translator()

        const csrf = ref<string | null>(null)
        const recoveryShown = ref<boolean>(false)
        const codeRef = ref(null)
        const recoveryCodeRef = ref(null)

        onMounted(() => {
            csrf.value = Csrf.token()
        })

        const toggleToCode = () => {
            recoveryShown.value = false;

            nextTick().then(() => {
                codeRef.value.focus()
            })
        }

        const toggleToRecovery = () => {
            recoveryShown.value = true;

            nextTick().then(() => {
                recoveryCodeRef.value.focus()
            })
        }

        return {
            csrf,
            recoveryShown,
            recoveryCodeRef,
            codeRef,
            trans,
            toggleToCode,
            toggleToRecovery,
        }
    },

    template: `
        <div class="card shadow-sm">
            <h4 class="card-header text-center">{{ trans("Two Factor Authentication") }}</h4>
            <div class="card-body">
                <div class="mb-4 small text-gray" v-if="recoveryShown">
                    {{ trans("Please confirm access to your account by entering one of your emergency recovery codes.") }}
                </div>
                <div class="mb-4 small text-gray" v-else>
                    {{ trans("Please confirm access to your account by entering the authentication code provided by your authenticator application.") }}
                </div>
                <form :action="action" method="POST">
                    <input type="hidden" name="_token" :value="csrf">

                    <div class="row g-3">
                        <div class="col-lg-12" v-if="recoveryShown">
                            <div class="form-label-group">
                                <input type="text" id="recovery_code" name="recovery_code" ref="recoveryCodeRef"
                                       class="form-control" autofocus autocomplete="one-time-code">
                                <label for="recovery_code">{{ trans("Recovery Code") }}</label>
                            </div>
                        </div>

                        <div class="col-lg-12" v-else>
                            <div class="form-label-group">
                                <input type="text" id="code" name="code" ref="codeRef"
                                       class="form-control" autofocus autocomplete="one-time-code">
                                <label for="code">{{ trans("Code") }}</label>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <button v-if="recoveryShown" @click.prevent="toggleToCode" type="button"
                                    class="btn btn-block btn-light">{{ trans("Use an authentication code") }}</button>
                            <button v-else @click.prevent="toggleToRecovery" type="button"
                                    class="btn btn-block btn-light">{{ trans("Use a recovery code") }}</button>
                            <button type="submit" class="btn btn-block btn-primary">{{ trans("Login") }}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,
})
