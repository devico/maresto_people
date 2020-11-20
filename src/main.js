import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from './store'
import VueMarkdown from 'vue-markdown'
import "bootstrap/dist/css/bootstrap.css";
import Loader from './components/app/Loader'
import '@/plugins/apexcharts'
import vuetify from './plugins/vuetify';

const base = axios.create({
  // baseURL: "http://people.maresto.ua:4000"
  baseURL: "http://localhost:4000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

Vue.component('Loader', Loader)
Vue.component('vue-markdown', VueMarkdown)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
