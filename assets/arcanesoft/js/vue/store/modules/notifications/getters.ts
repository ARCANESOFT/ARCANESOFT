import { computed, ComputedRef } from 'vue'
import { Notifications } from '../../types/notifications'
import state from './state'

export type Getters = {
    notifications: ComputedRef<Notifications>
    unreadNotifications: ComputedRef<Notifications>
    hasUnreadNotifications: ComputedRef<boolean>
}

export default (): Getters => {
    const notifications = computed<Notifications>(() => state.notifications)
    const unreadNotifications = computed<Notifications>(
        () => notifications.value.filter((notification) => notification.read === false)
    )
    const hasUnreadNotifications = computed<boolean>(() => unreadNotifications.value.length > 0)

    return {
        notifications,
        unreadNotifications,
        hasUnreadNotifications,
    }
}
