/* eslint-disable import/no-named-as-default-member */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// eslint-disable-next-line import/no-unresolved
import ApiService from '@/services/api.service'
// eslint-disable-next-line import/no-unresolved
import JwtService from '@/services/jwt.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    // eslint-disable-next-line import/no-named-as-default-member
    token: JwtService.getToken().token,
    user: null,
    sidebarMinimize: false,
    sidebarShow: 'responsive',
  },
  mutations: {
    toggleSidebarDesktop(state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, { token, user }) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.user = null
    },
    reset_auth(state) {
      state.status = ''
      state.token = ''
      state.user = null
    },
    set_auth(state, { user }) {
      state.user = user
    },
    set(state, [variable, value]) {
      state[variable] = value
    },
  },
  actions: {
    login({ commit }, userData) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        ApiService.post(`${Vue.prototype.$app_url}/api/auth/login `, userData)
          .then(response => {
            const token = response.data.access_token
            const { user } = response.data
            JwtService.setToken(token, 'agency', user)
            ApiService.setHeader()
            commit('auth_success', { token, user })
            resolve(response)
          })
          .catch(error => {
            console.log('login error', error)
            commit('auth_error')
            JwtService.unsetToken()
            reject(error)
          })
      })
    },

    logout({ commit }) {
      return new Promise(resolve => {
        commit('logout')
        JwtService.unsetToken()
        resolve()
        this.$router.push('/login')
      })
    },

    check_auth({ commit }) {
      if (JwtService.getToken().token) {
        ApiService.setHeader()

        ApiService.get(`${Vue.prototype.$app_url}/api/auth/verify`)
          .then(res => {
            const user = res.data.data
            console.log(user)
            commit('set_auth', { user })
          })
          .catch(error => {
            console.log(error)
            // eslint-disable-next-line no-restricted-globals
            location.replace('/login')
          })
      } else {
        commit('reset_auth')
      }
    },

    remove_notification({ commit }, { notification }) {
      commit('remove_notification', { notification })
    },
  },
  getters: {
    isLoggedIn() {
      return !!JwtService.getToken().token
    },

    getAuthName() {
      return JwtService.getToken().authName
    },
  },
  modules: {

  },
  plugins: [createPersistedState()],
})
