import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from './store'
import "bootstrap/dist/css/bootstrap.css";
import '@/plugins/apexcharts'
import vuetify from './plugins/vuetify';

const base = axios.create({
  baseURL: "http://192.168.58.106:4000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");