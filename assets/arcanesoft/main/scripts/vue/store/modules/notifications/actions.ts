import { Notification } from '../../types/notifications'
import api from '../../api/notifications'
import mutations from './mutations'
import getters from './getters'

export type Actions = {
    fetchNotifications(): Promise<void>
    markNotificationAsRead(notification: Notification): void
}

export default (): Actions => {
    const { getNotifications, markAsRead } = api()
    const { setNotifications } = mutations()
    const { notifications } = getters()

    const fetchNotifications = async (): Promise<void> => {
        return await getNotifications().then((response) => {
            setNotifications(response.data.notifications)
        })
    }

    const markNotificationAsRead = async ({id}: Notification): Promise<void> => {
        const notification = notifications.value.find((notification: Notification) => notification.id === id)

        await markAsRead(notification)

        console.log(`Mark notification as read with id: ${notification.id}`)
    }

    return {
        fetchNotifications,
        markNotificationAsRead,
    }
}
