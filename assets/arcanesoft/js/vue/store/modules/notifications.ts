import api from '../api/notifications'

// initial state
const state = {
    all: []
}

// getters
const getters = {
    //
}

// actions
const actions = {
    getAllNotifications({ commit }) {
        api.getNotifications(products => {
            commit('setNotifications', products)
        })
    }
}

// mutations
const mutations = {
    setNotifications(state, notifications) {
        state.all = notifications
    },

    markNotificationAsRead(state, { id }) {
        const notification = state.all.find(notification => notification.id === id)

        console.log(`Mark notification as read with id: ${notification.id}`)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
