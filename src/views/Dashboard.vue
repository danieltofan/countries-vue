<script setup>
import { ref, computed } from 'vue'
import { countries, getRegions, formatPopulation } from '../data/countries'
import CountryCard from '../components/CountryCard.vue'

const searchQuery = ref('')
const selectedRegion = ref('')
const sortBy = ref('name')

const regions = getRegions()

const filteredCountries = computed(() => {
  let result = [...countries]

  // Filter by search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c =>
      c.name.common.toLowerCase().includes(q) ||
      c.name.official.toLowerCase().includes(q) ||
      (c.capital && c.capital.some(cap => cap.toLowerCase().includes(q)))
    )
  }

  // Filter by region
  if (selectedRegion.value) {
    result = result.filter(c => c.region === selectedRegion.value)
  }

  // Sort
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.common.localeCompare(b.name.common)
      case 'population':
        return b.population - a.population
      case 'area':
        return b.area - a.area
      default:
        return 0
    }
  })

  return result
})

const stats = computed(() => ({
  total: filteredCountries.value.length,
  totalPopulation: filteredCountries.value.reduce((sum, c) => sum + c.population, 0),
  totalArea: filteredCountries.value.reduce((sum, c) => sum + c.area, 0)
}))

function clearFilters() {
  searchQuery.value = ''
  selectedRegion.value = ''
  sortBy.value = 'name'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <section class="text-center mb-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
        Explore the World
      </h1>
      <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Discover {{ countries.length }} countries, compare demographics, and test your geography knowledge
      </p>
    </section>

    <!-- Stats Bar -->
    <section class="grid grid-cols-3 gap-4 mb-8">
      <div class="card p-4 text-center">
        <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ stats.total }}</p>
        <p class="text-sm text-slate-500 dark:text-slate-400">Countries</p>
      </div>
      <div class="card p-4 text-center">
        <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ formatPopulation(stats.totalPopulation) }}</p>
        <p class="text-sm text-slate-500 dark:text-slate-400">Total Population</p>
      </div>
      <div class="card p-4 text-center">
        <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ (stats.totalArea / 1e6).toFixed(1) }}M</p>
        <p class="text-sm text-slate-500 dark:text-slate-400">km² Area</p>
      </div>
    </section>

    <!-- Filters -->
    <section class="card p-4 mb-8">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <label for="search" class="sr-only">Search countries</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or capital..."
              class="input pl-10"
            />
          </div>
        </div>

        <!-- Region Filter -->
        <div class="sm:w-48">
          <label for="region" class="sr-only">Filter by region</label>
          <select
            id="region"
            v-model="selectedRegion"
            class="input"
          >
            <option value="">All Regions</option>
            <option v-for="region in regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>

        <!-- Sort -->
        <div class="sm:w-48">
          <label for="sort" class="sr-only">Sort by</label>
          <select
            id="sort"
            v-model="sortBy"
            class="input"
          >
            <option value="name">Sort by Name</option>
            <option value="population">Sort by Population</option>
            <option value="area">Sort by Area</option>
          </select>
        </div>

        <!-- Clear Filters -->
        <button
          v-if="searchQuery || selectedRegion || sortBy !== 'name'"
          @click="clearFilters"
          class="btn btn-secondary whitespace-nowrap"
        >
          Clear Filters
        </button>
      </div>
    </section>

    <!-- Results -->
    <section>
      <div v-if="filteredCountries.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-slate-500 dark:text-slate-400">No countries found matching your criteria</p>
        <button @click="clearFilters" class="btn btn-primary mt-4">Clear Filters</button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CountryCard
          v-for="country in filteredCountries"
          :key="country.cca3"
          :country="country"
        />
      </div>
    </section>
  </div>
</template>
