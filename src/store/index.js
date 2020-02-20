import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allCountries: []
  },
  getters: {
    allCountryNames(state) {
      return state.allCountries.map(country => country.name);
    },
    countryByName(state) {
      return name => state.allCountries.find(country => country.name === name);
    },
    countriesByRegion(state) {
      return region =>
        state.allCountries
          .filter(country => country.region === region)
          .sort((a, b) => a.name > b.name);
    }
  },
  mutations: {
    setCountries(state, data) {
      state.allCountries = data;
    }
  },
  actions: {
    async getCountries({ commit }) {
      let url = "https://restcountries.eu/rest/v2/all";
      let json = await axios.get(url);
      commit("setCountries", json.data);
    }
  },
  modules: {}
});
