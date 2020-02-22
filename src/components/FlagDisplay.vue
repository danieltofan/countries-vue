<template>
  <b-card :title="country.name" :class="{ 'is-dark': isDark }">
    <template v-slot:header>
      <div
        class="header-image" :class=[flagBgSize]
        :style="{ 'background-image': `url(${country.flag})` }"
      ></div>
    </template>
    <b-card-text class="text-left">
      <p>Capital: {{ country.capital }}</p>
      <p>Region: {{ country.region }}</p>
      <p>Population: {{ country.population }}</p>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: ['country', 'isDark', 'flagBgSize'],
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
  border: none;
  outline: 1px solid rgba(0, 0, 0, 0.125) !important;
  transition: box-shadow 0.2s;
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
}

.header-image.cover {
  background-size: cover;
}

.header-image.contain {
  background-size: contain;
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
