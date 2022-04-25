import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    citycode: "420100",
    cityStatus: false
  },
  mutations: {
    changeCitycode(state, value) {
      state.citycode = value;
    },
    //动态更改状态
    changeCityStatus(state, value) {
      state.cityStatus = value;
      console.log(value)
    }
  },
  actions: {
    setCitycode({ commit }, value) {
      commit("changeCitycode", value);
    },
    setCityStatus({ commit }, value) {
      commit("changeCityStatus", value);
    }
  }
});
