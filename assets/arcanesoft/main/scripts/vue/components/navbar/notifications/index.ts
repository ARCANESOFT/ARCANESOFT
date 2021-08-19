import { defineComponent, onMounted } from 'vue'
import notificationsModule from '../../../store/modules/notifications'

export default defineComponent({
    name: 'v-navbar-notifications',

    setup() {
        const { fetchNotifications, unreadNotifications, hasUnreadNotifications } = notificationsModule()

        onMounted(async () => {
            await fetchNotifications()
        })

        return {
            unreadNotifications,
            hasUnreadNotifications,
        }
    },

    template: `
        <a id="notifications-dropdown" href="#" data-bs-toggle="dropdown"
           class="dropdown-toggle no-caret navbar-link-item navbar-link-icon">
            <span class="status-indicator">
                <i class="far fa-fw fa-bell"></i>
                <span class="status status-top bg-danger" v-show="hasUnreadNotifications"></span>
            </span>
        </a>
        <div class="dropdown-menu dropdown-menu-right mt-0" aria-labelledby="notifications-dropdown">
            <h6 class="px-3 py-2 mb-0 fw-bold text-center">Notifications</h6>
            <div class="dropdown-divider"></div>

            <div v-for="notification in unreadNotifications" :key="notification.id">
                <a class="dropdown-item">
                    <div class="d-flex align-items-start flex-column justify-content-center">
                        <h6 class="fw-normal mb-1">{{ notification.title }}</h6>
                        <p class="text-gray small ellipsis mb-0">{{ notification.message }}</p>
                    </div>
                </a>
                <div class="dropdown-divider"></div>
            </div>

            <a href="#" class="dropdown-item">
                <small class="fw-bold">See all notifications</small>
            </a>
        </div>
    `,
})
