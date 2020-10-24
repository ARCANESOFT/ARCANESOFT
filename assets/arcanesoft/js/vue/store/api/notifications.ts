import { Notification, Notifications } from '../types/notifications'

const notifications = [
    {
        id: 1,
        title: "Event today",
        message: "Just a reminder that you have an event today",
        type: "success",
        read: false
    },
    {
        id: 2,
        title: "Settings",
        message: "Update dashboard",
        type: "warning",
        read: false
    },
    {
        id: 3,
        title: "Launch Admin",
        message: "New admin template, wow!",
        type: "info",
        read: false
    },
    {
        id: 4,
        title: "John was promoted",
        message: "Great news everyone, John DOE was promoted yesterday",
        type: "success",
        read: true
    }
]

export type NotificationsResponse = {
    data: {
        notifications: Notifications,
    }
}

export default () => {
    function fakeApiCall(callback: Function): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(callback()), 100)
        })
    }

    const getNotifications = (): Promise<NotificationsResponse> => fakeApiCall(() => ({
        status: 200,
        data: {
            notifications,
        },
    }))

    const markAsRead = (notification: Notification): Promise<void> => fakeApiCall(() => ({
        status: 200,
        data: {
            message: `Notification with id ${notification.id} was marked as read!`,
        },
    }))

    return {
        getNotifications,
        markAsRead,
    }
}
