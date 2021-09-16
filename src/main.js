import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import ApiService from './services/api.service'
// eslint-disable-next-line import/extensions
import Config from './config.js'

Vue.config.productionTip = false

Vue.prototype.$app_url = Config.app_url
Vue.prototype.$base_name = Config.base_name

ApiService.init()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
