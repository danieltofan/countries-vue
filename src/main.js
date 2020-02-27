import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import store from "./store"
import router from './router'
import {
  BootstrapVue,
  BootstrapVueIcons
} from "bootstrap-vue"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
//import "./assets/bootstrap.slate.min.css"

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")