<template>
  <b-card-group>
    <b-card
      v-for="country in countryList"
      :key="country.name"
      :title="country.name"
    >
      <template v-slot:header>
        <div
          class="header-image"
          :style="{ 'background-image': `url(${country.flag})` }"
        ></div>
      </template>
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
  border-radius: 4px;
  box-shadow: 1px 1px 5px darkgrey;
  transition: box-shadow 0.2s;
}

.card-header {
  padding: 0;
  width: 240px;
  height: 130px;
}

.header-image {
  height: 130px;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.card:hover {
  box-shadow: 3px 2px 7px darkslategray;
  cursor: pointer;
}

.card-img {
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
