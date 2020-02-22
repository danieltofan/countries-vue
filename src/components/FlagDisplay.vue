<template>
  <b-card :title="country.name" :class="{ 'is-dark': isDark }">
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
      {{ isDark }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: ["country", "isDark"],
  methods: {
    altCountryFlag(name) {
      return `${name}'s flag`;
    }
  }
};
</script>

<style scoped>
.card {
  min-width: 240px;
  max-width: 240px;
  height: 300px !important;
  flex: 1 1 240px !important;
  margin: 20px 20px !important;
  border-radius: 4px;
  box-shadow: 0px 0px 5px darkgrey;
  transition: box-shadow 0.2s, transform 0.15s;
}

.card-header {
  padding: 0;
  width: 240px;
  height: 131px;
  position: relative;
  top: -1px;
}

.header-image {
  height: 131px;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.card:hover {
  box-shadow: 0px 0px 10px darkslategray;
  cursor: pointer;
}

.card.is-dark:hover {
  box-shadow: 0px 0px 10px lavender;
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
