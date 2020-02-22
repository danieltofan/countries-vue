<template>
  <div id="app">
    <b-navbar :variant="navbarVariant" :type="navbarVariant" fixed="top">
      <b-navbar-brand tag="h3">Where in the world?</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right no-caret ref="dropdown">
          <template v-slot:button-content>
            <b-icon-gear-fill font-scale="2" :variant="gearVariant" />
          </template>

          <b-dropdown-form>
            <b-form-checkbox
              v-model="isDark"
              name="switch-dark"
              class="toggle-dark-input"
              :button-variant="toggleDarkVariant"
              @change="toggleBodyClass(isDark)"
              button
            >
              Toggle dark mode
            </b-form-checkbox>
          </b-dropdown-form>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <b-container fluid class="main-app">
      <b-row class="inputs-row mb-3">
        <b-col lg="6" md="12" class="mb-2">
          <b-input-group>
            <b-input-group-prepend>
              <b-input-group-text class="text-info">
                <b-icon-search />
              </b-input-group-text>
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
                variant="success"
                @click="displayCountry"
                :disabled="invalidCountryName"
              >
                <small>Go</small>
              </b-button>
              <b-button variant="danger" @click="clearNameSearch">
                <small>Clear</small>
              </b-button>
            </b-input-group-append>
          </b-input-group>

          <datalist id="country-name-list">
            <option v-for="name in allCountryNames" :key="name">
              {{ name }}
            </option>
          </datalist>
        </b-col>

        <b-col lg="4" md="12" offset-lg="2">
          <b-form-select
            v-model="filterByRegion"
            :options="regions"
            @change="displayCountriesByRegion"
          ></b-form-select>
        </b-col>
      </b-row>

      <b-row class="results-row">
        <b-card-group>
          <flag-display
            v-for="country in countries"
            :key="country.name"
            :country="country"
            :isDark="isDark"
          ></flag-display>
        </b-card-group>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FlagDisplay from "./components/FlagDisplay";

export default {
  name: "App",
  components: {
    FlagDisplay
  },
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
      filterByRegion: null,
      countries: null,
      isDark: false
    };
  },
  computed: {
    ...mapGetters(["allCountryNames", "countryByName", "countriesByRegion"]),
    invalidCountryName() {
      return !this.allCountryNames.includes(this.countryName);
    },
    navbarVariant() {
      return this.isDark ? "dark" : "light";
    },
    gearVariant() {
      return this.isDark ? "light" : "dark";
    },
    toggleDarkVariant() {
      return this.isDark ? "dark" : "outline";
    },
    bodyVariant() {
      return this.isDark
        ? ["body-dark", "body-light"]
        : ["body-light", "body-dark"];
    }
  },
  methods: {
    ...mapActions(["getCountries"]),
    clearNameSearch() {
      this.countryName = "";
      this.countries = [];
    },
    displayCountry() {
      this.filterByRegion = null;
      this.countries = [this.countryByName(this.countryName)];
    },
    displayCountriesByRegion() {
      this.countryName = null;
      this.countries = this.countriesByRegion(this.filterByRegion);
    },
    toggleBodyClass(isDark) {
      const body = document.body;
      body.classList.remove(isDark ? "body-dark" : "body-light");
      body.classList.add(isDark ? "body-light" : "body-dark");
      this.$refs.dropdown.hide();
    }
  },
  mounted() {
    this.getCountries();
  }
};
</script>

<style lang="scss">
body,
.navbar,
.b-icon {
  transition: background-color 0.3s;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: calc(100vh - 60px);
  margin: 60px auto 0;
  padding: 40px;
}

.body-dark {
  background-color: #212e37;
}

.body-light {
  background-color: aliceblue;
}

.custom-select {
  font-size: 0.9rem !important;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.toggle-dark-input {
  width: 160px;
  font-size: 0.9em;
}

.card:first-of-type .card-header {
  left: -1px;
}
</style>
