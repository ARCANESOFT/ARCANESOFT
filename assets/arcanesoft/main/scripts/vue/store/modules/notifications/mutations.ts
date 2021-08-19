import { Notifications } from '../../types/notifications'
import state from './state'

export type Mutations = {
    setNotifications(notifications: Notifications): void
}

export default (): Mutations => {
    const setNotifications = (notifications: Notifications): void => {
        state.notifications = notifications
    }

    return {
        setNotifications,
    }
}
