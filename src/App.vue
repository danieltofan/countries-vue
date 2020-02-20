<template>
  <div id="app">
    <b-navbar variant="faded" fixed="top">
      <b-navbar-brand tag="h3">Where in the world?</b-navbar-brand>
    </b-navbar>
    <b-container fluid class="main-app">
      <b-row class="inputs-row mb-3">
        <b-col lg="6" md="12" class="mb-2">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text class="text-info"
                ><b-icon-search
              /></b-input-group-text>
            </b-input-group-prepend>

            <b-form-input
              type="text"
              v-model="countryName"
              list="country-name-list"
              id="country-name-search"
              placeholder="Search for a country..."
            ></b-form-input>

            <b-input-group-append v-if="countryName">
              <b-button
                variant="outline-success"
                @click="displayCountry"
                :disabled="invalidCountryName"
                ><small>Go</small></b-button
              >
              <b-button variant="outline-danger" @click="clearNameSearch"
                ><small>Clear</small></b-button
              >
            </b-input-group-append>
          </b-input-group>

          <datalist id="country-name-list">
            <option v-for="name in allCountryNames" :key="name">{{
              name
            }}</option>
          </datalist>
        </b-col>
        <b-col lg="4" md="12" offset-lg="2">
          <b-form-select
            v-model="filterByRegion"
            :options="regions"
          ></b-form-select>
        </b-col>
      </b-row>

      <b-row class="results-row"> </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  data() {
    return {
      countryName: "",
      regions: [
        { value: null, html: "<i>Select a geographical region</i>" },
        { value: "Africa", text: "Africa" },
        { value: "Americas", text: "Americas" },
        { value: "Asia", text: "Asia" },
        { value: "Europe", text: "Europe" },
        { value: "Oceania", text: "Oceania" }
      ],
      filterByRegion: null
    };
  },
  computed: {
    ...mapGetters(["allCountryNames", "countryByName", "countriesByRegion"]),
    invalidCountryName() {
      return !this.allCountryNames.includes(this.countryName);
    }
  },
  methods: {
    ...mapActions(["getCountries"]),
    clearNameSearch() {
      this.countryName = "";
    },
    displayCountry() {}
  },
  mounted() {
    this.getCountries();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: aliceblue;
  height: calc(100vh - 60px);
  margin: 60px auto 0;
  padding: 40px;
}
</style>
