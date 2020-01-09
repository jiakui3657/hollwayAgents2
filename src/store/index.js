import Vue from "vue";
import Vuex from "vuex";
import https from "../http/http.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    size: 10
  },
  mutations: {
    addUserInfo(state, payload) {
      window.console.log(payload);
      state.userInfo = payload;
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async getUserInfo({ commit, state }) {
      let params = {};
      try {
        const data = await https.fetchPost("/rest/agent/info.htm", params);
        if (data.code == 0) {
          window.console.log(data);
          commit("addUserInfo", data);
          // this.$router.push("/home");
        } else {
          this.$toast(data.msg);
        }
      } catch (err) {
        window.console.log(err);
      }
    }
  },
  modules: {}
});
