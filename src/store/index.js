import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allCountryNames: []
  },
  mutations: {
    setCountrieNames(state, data) {
      state.allCountryNames = data;
    }
  },
  actions: {
    async getAllCountrieNames({ commit }) {
      let url = "https://restcountries.eu/rest/v2/all?fields=name";
      let json = await axios.get(url);
      commit(
        "setCountrieNames",
        json.data.map(item => item.name)
      );
    }
  },
  modules: {}
});
