import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from './jwt.service'

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = this.$app_url
  },

  setHeader() {
    Vue.axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      // eslint-disable-next-line import/no-named-as-default-member
      Authorization: `Bearer ${JwtService.getToken().token}`,
      'Content-Type': 'multipart/form-data',
    }
  },

  get(resource, slug = '') {
    if (slug !== '') {
      return Vue.axios.get(`${resource}/${slug}`).catch(error => {
        throw new Error(`[RWV] ApiService ${error}`)
      })
    }

    return Vue.axios.get(`${resource}`).catch(error => {
      throw new Error(`[RWV] ApiService 111 ${error}`)
    })
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },

  delete(resource, params) {
    return Vue.axios.delete(`${resource}`, params)
  },
}

export default ApiService
