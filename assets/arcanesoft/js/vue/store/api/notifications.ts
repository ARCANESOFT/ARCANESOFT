const _notifications = [
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
];

export default {
    getNotifications (callback) {
        setTimeout(() => callback(_notifications), 100)
    }
}
