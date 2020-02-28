import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCountries: [],
    isDarkMode: false,
    flagBgSize: 'cover',
    selectedRegion: null
  },
  getters: {
    allCountryNames(state) {
      return state.allCountries.map(country => country.name)
    },
    countryByName(state) {
      return name => state.allCountries.find(country => country.name === name)
    },
    countryNameByAbbrev(state) {
      return abbrev => state.allCountries.find(country => country.alpha3Code === abbrev).name
    },
    borderCountryNames(state, getters) {
      return name => getters.countryByName(name).borders.map(abbrev => getters.countryNameByAbbrev(abbrev))
    },
    countriesByRegion(state) {
      return region =>
        state.allCountries
        .filter(country => country.region === region)
        .sort((a, b) =>
          a.name.localeCompare(b.name, "en", {
            sensitivity: "base"
          })
        )
    }
  },
  mutations: {
    setCountries(state, data) {
      state.allCountries = data;
    },
    setDarkMode(state, isDark) {
      state.isDarkMode = !!isDark
    },
    setFlagBgSize(state, size) {
      state.flagBgSize = size
    },
    setRegion(state, region) {
      state.selectedRegion = region
    }
  },
  actions: {
    async getCountries({
      commit
    }) {
      let url = "https://restcountries.eu/rest/v2/all"
      let json = await axios.get(url)
      commit("setCountries", json.data)
    }
  },
  modules: {}
})