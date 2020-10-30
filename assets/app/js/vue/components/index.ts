import TwoFactorAuthenticationComponent from './Authentication/TwoFactorAuthenticationComponent'
import ImpersonatedUserComponent from './ImpersonatedUserComponent'
import ActionMessage from './UI/ActionMessage'

export default {
    // Authentication
    'v-auth-two-factor-authentication': TwoFactorAuthenticationComponent,
    'v-impersonated-user': ImpersonatedUserComponent,

    // UI
    'v-action-message': ActionMessage,
}
