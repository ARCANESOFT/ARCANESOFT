import { defineComponent, onMounted, nextTick, ref, computed } from 'vue'
import errors, { FormErrors } from '@arcanesoft/core/src/helpers/form-errors'
import translator from '../../../../mixins/translator'
import api from './api'
import { Modal } from 'bootstrap/js/index.esm.js'

type BrowserSession = {
    id: string
    agent: {
        isDesktop: boolean
        osName: string
        clientName: string
    }
    ipAddress: string
    isCurrentDevice: true
    lastActivityAt: {
        diffForHumans: string
        timestamp: number
    }
}

export default defineComponent({
    name: 'v-account-settings-browser-sessions',

    setup() {
        const request = api()

        const { trans } = translator()
        const isLoading = ref<boolean>(true)

        const sessions = ref<BrowserSession[]>([])
        const hasSessions = computed<boolean>(() => sessions.value.length > 0)
        const canLogoutOthers = computed<boolean>(() => {
            if ( ! hasSessions.value)
                return false

            return sessions.value
                .filter((session) => ! session.isCurrentDevice)
                .length > 0
        })

        const confirmModal = ref(null)
        const confirmModalRef = ref(null)
        const confirmPassword = ref<string>('')
        const confirmPasswordRef = ref(null)
        const confirmErrors = ref<FormErrors>(errors())

        const fetchSessions = () => {
            isLoading.value = true

            return request
                .fetchSessions()
                .then(({data}) => {
                    sessions.value = data.data
                })
                .finally(() => {
                    isLoading.value = false
                })
        }

        onMounted(async () => {
            await fetchSessions()

            confirmModal.value = new Modal(confirmModalRef.value, {
                backdrop: 'static',
                keyboard: false,
            })
            confirmModal.value._element.addEventListener('shown.bs.modal', () => {
                nextTick().then(() => {
                    confirmPasswordRef.value.focus()
                })
            })
        })

        const confirmLogout = (): void => {
            confirmModal.value.show()
        }

        const logoutOtherBrowserSessions = async () => {
            isLoading.value = true
            confirmErrors.value.reset()

            await request
                .logoutOtherSessions({
                    data: {password: confirmPassword.value}
                })
                .then(async () => {
                    confirmModal.value.hide()

                    await fetchSessions()
                })
                .catch(({ response }) => {
                    if (response && response.status === 422) {
                        confirmErrors.value.setErrors(response.data.errors)
                    }
                })
                .finally(() => {
                    isLoading.value = false
                })
        }

        return {
            isLoading,
            hasSessions,
            sessions,
            canLogoutOthers,

            confirmModalRef,
            confirmPassword,
            confirmPasswordRef,
            confirmErrors,

            trans,
            confirmLogout,
            logoutOtherBrowserSessions,
        }
    },

    template: `
        <div class="card">
            <div class="card-body">
                <p v-text="trans('Manage and logout your active sessions on other browsers and devices.')"></p>
                <p v-text="trans('If necessary, you may logout of all of your other browser sessions across all of your devices. If you feel your account has been compromised, you should also update your password.')"
                   class="mb-0 text-muted small"></p>

                <div v-if="hasSessions" class="mt-3">
                    <div class="row g-3">
                        <div class="col-12" v-for="session in sessions" :key="session.id">
                            <div class="d-flex align-items-center">
                                <div class="text-black-50" style="height: 2.5rem; width: 2.5rem;">
                                    <svg v-if="session.agent.isDesktop" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2"
                                         stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M0 0h24v24H0z" stroke="none"></path>
                                        <rect x="7" y="4" width="10" height="16" rx="1"></rect>
                                        <path d="M11 5h2M12 17v.01"></path>
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <div v-text="session.agent.osName+' - '+session.agent.clientName"
                                         class="small text-muted"></div>
                                    <div class="small">
                                        <small class="text-gray-500">
                                            {{ session.ipAddress }},
                                            <span v-if="session.isCurrentDevice" class="text-success">{{ trans('This device') }}</span>
                                            <span v-else>{{ trans('Last active')+' '+session.lastActivityAt.diffForHumans }}</span>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="canLogoutOthers" class="card-footer text-right">
                <button @click.prevent="confirmLogout" v-text="trans('Logout Other Browser Sessions')"
                        class="btn btn-sm btn-primary"></button>
            </div>
        </div>

        <teleport to="body">
            <div ref="confirmModalRef" class="modal fade" id="confirmModal" tabindex="-1"
                 aria-labelledby="confirmModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="confirmModalLabel">Logout Other Browser Sessions</h5>
                            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" :disabled="isLoading"></button>
                        </div>
                        <div class="modal-body">
                            <p class="small text-muted">Please enter your password to confirm you would like to logout of your other browser sessions across all of your devices.</p>

                            <input v-model="confirmPassword" ref="confirmPasswordRef" type="password" :readonly="isLoading"
                                   @keyup.enter="logoutOtherBrowserSessions" id="confirm-password"
                                   class="form-control" :class="{'is-invalid': confirmErrors.has('password')}" placeholder="Password">
                            <div id="confirm-password-feedback" class="invalid-feedback">{{ confirmErrors.first('password') }}</div>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-sm btn-secondary" :disabled="isLoading"
                                    data-dismiss="modal">{{ trans('Cancel') }}</button>
                            <button type="button" class="btn btn-sm btn-primary" :disabled="isLoading"
                                    @click.prevent="logoutOtherBrowserSessions">{{ trans('Logout Other Browser Sessions') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    `,
})
