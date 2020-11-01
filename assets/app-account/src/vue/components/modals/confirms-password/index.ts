import { computed, defineComponent, nextTick, ref } from 'vue'
import api from './api'
import translator from '../../../../mixins/translator'
import Modal from '../modal'
import FormErrors from '@arcanesoft/core/src/helpers/form/errors'

export default defineComponent({
    name: 'v-confirms-password-modal',

    props: {
        title: {
            type: String,
            default: 'Confirm Password',
        },
        content: {
            type: String,
            default: 'For your security, please confirm your password to continue.',
        },
        button: {
            type: String,
            default: 'Confirm',
        },
    },

    emits: ['confirmed'],

    components: {
        Modal,
    },

    setup(_, ctx) {
        const request = api()
        const { trans } = translator()

        const confirmingPassword = ref<boolean>(false)
        const password = ref<string>('')
        const passwordRef = ref<any>(null)
        const formErrors = ref<FormErrors>(new FormErrors({}))

        const startConfirming = async () => {
            formErrors.value.reset()

            await request.status().then(({data}) => {
                if (data.confirmed)
                    return ctx.emit('confirmed')

                confirmingPassword.value = true
                password.value = ''

                nextTick().then(() => { passwordRef.value.focus() })
            })
        }

        const confirm = async () => {
            formErrors.value.reset()

            await request.confirm({ password: password.value }).then(() => {
                confirmingPassword.value = false
                password.value = ''

                nextTick().then(() => ctx.emit('confirmed'))
            })
            .catch(({ response }) => {
                formErrors.value.setMessages(response.data.errors)
            })
        }

        const isLoading = computed<boolean>(() => request.isLoading.value)

        return {
            isLoading,
            confirmingPassword,
            passwordRef,
            password,
            formErrors,
            trans,
            startConfirming,
            confirm,
        }
    },

    template: `
        <span @click="startConfirming">
            <slot />
        </span>

        <Modal v-if="confirmingPassword" :show="confirmingPassword" @closed="confirmingPassword = false">
            <template #title>{{ trans(title) }}</template>

            <template #body>
                <p>{{ trans(content) }}</p>

                <div class="form-floating mt-3">
                    <input type="password" ref="passwordRef" v-model="password" @keyup.enter="confirm"
                           class="form-control" :class="{'is-invalid': formErrors.has('password')}" :placeholder="trans('Password')">
                    <label for="floatingPassword" v-text="trans('Password')"></label>
                    <div v-if="formErrors.has('password')"
                         v-text="formErrors.first('password')"
                         class="invalid-feedback"></div>
                </div>
            </template>

            <template #footer>
                <button type="button" data-dismiss="modal"
                        class="btn btn-secondary" :disabled="isLoading">{{ trans('Nevermind') }}</button>
                <button @click.prevent="confirm" type="button"
                        class="btn btn-primary" :disabled="isLoading">{{ trans(button) }}</button>
            </template>
        </Modal>
    `,
})
