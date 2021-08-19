export type Notification = {
    id: number
    title: string
    message: string
    type: string
    read: boolean
}

export type Notifications = Array<Notification>
