<template>
  <div id="app">
    <b-navbar variant="faded" fixed="top">
      <b-navbar-brand tag="h3">Where in the world?</b-navbar-brand>
    </b-navbar>
    <b-container fluid class="main-app">
      <b-row>
        <b-col lg="4" md="6" class="mb-2">
          <b-form-input
            type="text"
            v-model="countryName"
            list="country-name-list"
            id="country-name-search"
            placeholder="Search for a country..."
          ></b-form-input>

          <datalist id="country-name-list">
            <option v-for="name in allCountryNames" :key="name">{{
              name
            }}</option>
          </datalist>
        </b-col>
        <b-col lg="4" offset-lg="4" md="5" offset-md="1">
          <b-form-select
            v-model="filterByRegion"
            :options="regions"
          ></b-form-select>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

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
      filterByRegion: ""
    };
  },
  computed: {
    ...mapState(["allCountryNames"])
  },
  methods: {
    ...mapActions(["getAllCountrieNames"])
  },
  mounted() {
    this.getAllCountrieNames();
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
