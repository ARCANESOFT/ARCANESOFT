import { reactive } from 'vue'
import { Notifications } from '../../types/notifications'

export type State = {
    notifications: Notifications
}

export default reactive<State>({
    notifications: []
})
