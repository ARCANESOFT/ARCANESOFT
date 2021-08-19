import { defineComponent, onMounted, nextTick, ref, computed } from 'vue'
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

        const csrf = ref<string>(null)
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

        const message = computed<string>(() => recoveryShown.value
            ? 'Please confirm access to your account by entering one of your emergency recovery codes.'
            : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
        )

        return {
            csrf,
            recoveryShown,
            recoveryCodeRef,
            codeRef,
            message,
            trans,
            toggleToCode,
            toggleToRecovery,
        }
    },

    template: `
        <div class="card shadow-sm">
            <h4 class="card-header text-center" v-text="trans('Two Factor Authentication')"></h4>
            <div class="card-body">
                <div class="mb-4 small text-gray" v-text="trans(message)">
                </div>
                <form :action="action" method="POST">
                    <input type="hidden" name="_token" :value="csrf">

                    <div class="row row-cols-1 g-3">
                        <div class="col" v-if="recoveryShown">
                            <div class="form-floating">
                                <input type="text" id="recovery_code" name="recovery_code" ref="recoveryCodeRef"
                                       class="form-control" autofocus autocomplete="one-time-code"
                                       :placeholder="trans('Recovery Code')">
                                <label for="recovery_code" v-text="trans('Recovery Code')"></label>
                            </div>
                        </div>

                        <div class="col" v-else>
                            <div class="form-floating">
                                <input type="text" id="code" name="code" ref="codeRef"
                                       class="form-control" autofocus autocomplete="one-time-code"
                                       :placeholder="trans('Code')">
                                <label for="code" v-text="trans('Code')"></label>
                            </div>
                        </div>

                        <div class="col d-grid gap-2">
                            <button v-if="recoveryShown" type="button"
                                    @click.prevent="toggleToCode"
                                    v-text="trans('Use an authentication code')"
                                    class="btn btn-light"></button>

                            <button v-else type="button"
                                    @click.prevent="toggleToRecovery"
                                    v-text="trans('Use a recovery code')"
                                    class="btn btn-light"></button>

                            <button type="submit"
                                    v-text="trans('Login')"
                                    class="btn btn-primary"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,
})
