import { defineComponent, onMounted, ref, computed } from 'vue'
import api from './api'
import translator from '../../../../mixins/translator'
import ConfirmsPassword from '../../../components/modals/confirms-password'

export default defineComponent({
    name: 'v-account-settings-two-factor-authentication',

    components: {
        ConfirmsPassword,
    },

    setup: function () {
        const request = api()
        const { trans } = translator()
        const isEnabled = ref<boolean>(false)

        const isRecoveryCodesShown = ref<boolean>(false)
        const recoveryCodes = ref<string[]>([])

        const isQrCodeShown = ref<boolean>(false)
        const qrCode = ref<string | null>(null)

        request.isLoading.value = true

        const showRecoveryCodes = (): void => {
            if (isRecoveryCodesShown.value === false)
                isRecoveryCodesShown.value = true
        }

        const enable = async (): Promise<void> => await request.enable().then(({ data }) => {
            isEnabled.value = data.enabled

            recoveryCodes.value = data.recoveryCodes
            isRecoveryCodesShown.value = true

            qrCode.value = data.qrCode
            isQrCodeShown.value = true
        })

        const disable = async (): Promise<void> => await request.disable().then(({ data }) => {
            isEnabled.value = data.enabled

            if (data.enabled === false) {
                recoveryCodes.value = []
                isRecoveryCodesShown.value = false

                qrCode.value = null
                isQrCodeShown.value = false
            }
        })

        const regenerateRecoveryCodes = async (): Promise<void> => await request.regenerate().then(({ data }) => {
            isEnabled.value = data.enabled
            recoveryCodes.value = data.recoveryCodes
        })

        const isLoading = computed<boolean>(() => request.isLoading.value)

        onMounted(async () => {
            await request
                .status()
                .then(({ data }) => {
                    isEnabled.value = data.enabled
                    recoveryCodes.value = data.recoveryCodes
                })
        })

        return {
            isLoading,
            isEnabled,
            isQrCodeShown,
            isRecoveryCodesShown,
            qrCode,
            recoveryCodes,
            trans,
            disable,
            enable,
            showRecoveryCodes,
            regenerateRecoveryCodes,
        }
    },

    template: `
        <div class="card shadow-sm">
            <div class="card-body">
                <h6>{{ trans(isEnabled ? 'You have enabled two factor authentication.' : 'You have not enabled two factor authentication.') }}</h6>
                <p class="form-text mb-0">{{ trans("When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.") }}</p>

                <div v-if="isEnabled">
                    <div v-if="isQrCodeShown">
                        <p class="mt-4 font-weight-bold small text-gray">
                            {{ trans("Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application.") }}
                        </p>

                        <div>
                            <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" rel="noopener" class="d-inline-block">
                                <img src="/assets/svg/app/badges/google-play-badge.svg"
                                     alt="Get Google Authenticator on Google Play"
                                     style="max-height: 3rem;">
                            </a>
                            <a href="https://apps.apple.com/app/google-authenticator/id388497605" target="_blank" rel="noopener" class="d-inline-block">
                                <img src="/assets/svg/app/badges/app-store-badge.svg"
                                     alt="Get Google Authenticator on App Store"
                                     style="max-height: 3rem;">
                            </a>
                        </div>

                        <div class="mt-4" v-html="qrCode"></div>
                    </div>

                    <div v-if="isRecoveryCodesShown" class="mt-4">
                        <p class="font-weight-bold small text-gray">
                            {{ trans("Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.") }}
                        </p>

                        <div class="mb-4 p-3 d-flex flex-column bg-light font-monospace">
                            <span v-for="code in recoveryCodes" :key="code">{{ code }}</span>
                        </div>

                        <button @click.prevent="regenerateRecoveryCodes" :disabled="isLoading"
                                type="button" class="btn btn-sm btn-light">{{ trans('Regenerate Recovery Codes') }}</button>
                    </div>
                    <div v-else class="mt-4">
                        <button @click.prevent="showRecoveryCodes"
                                type="button" class="btn btn-sm btn-light">{{ trans('Show Recovery Codes') }}</button>
                    </div>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <ConfirmsPassword v-if="isEnabled" @confirmed="disable">
                    <button type="button" :disabled="isLoading"
                            class="btn btn-sm btn-danger">{{ trans('Disable') }}</button>
                </ConfirmsPassword>
                <ConfirmsPassword v-else @confirmed="enable">
                    <button type="button" :disabled="isLoading"
                            class="btn btn-sm btn-primary">{{ trans('Enable') }}</button>
                </ConfirmsPassword>
            </div>
        </div>
    `,
})
