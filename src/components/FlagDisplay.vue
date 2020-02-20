<template>
  <b-card-group>
    <b-card
      v-for="country in countryList"
      :key="country.name"
      :title="country.name"
      :img-src="country.flag"
      :img-alt="altCountryFlag(country.name)"
    >
      <b-card-text class="text-left">
        <p>Capital: {{ country.capital }}</p>
        <p>Region: {{ country.region }}</p>
        <p>Population: {{ country.population }}</p>
      </b-card-text>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  props: ["countryList"],
  methods: {
    altCountryFlag(name) {
      return `${name}'s flag`;
    }
  }
};
</script>

<style scoped>
.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  min-width: 240px;
  max-width: 240px;
  height: 300px !important;
  flex: 1 1 240px !important;
  margin: 20px 20px !important;
}

.card-img {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  height: 145px;
}

.card-title {
  font-size: 0.95em;
  font-weight: 500;
  text-align: left;
}

.card-body {
  background-color: azure;
}

p {
  font-size: 0.9em;
  margin-bottom: 0;
}
</style>
