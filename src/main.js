import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";
import "./libs/rem.js";
import VueCookies from "vue-cookies";
import https from "./http/http.js";

Vue.use(VueCookies);
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.prototype.https = https;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
