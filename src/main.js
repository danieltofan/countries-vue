import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import store from "./store"
import router from './router'
import {
  BootstrapVue,
  BootstrapVueIcons
} from "bootstrap-vue"
import VueLazyImageLoading from 'vue-lazy-image-loading'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueLazyImageLoading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")