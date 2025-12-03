<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getCountryByCode, formatPopulation, formatArea, getLanguages, getCurrencies, getBorderCountries } from '../data/countries'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const router = useRouter()

const country = computed(() => getCountryByCode(props.code))
const borderCountries = computed(() => country.value ? getBorderCountries(country.value) : [])

function goBack() {
  router.back()
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Back Button -->
    <button
      @click="goBack"
      class="btn btn-secondary mb-8 inline-flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      Back
    </button>

    <!-- Not Found -->
    <div v-if="!country" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Country Not Found</h2>
      <p class="text-slate-500 dark:text-slate-400 mb-4">The country you're looking for doesn't exist in our database.</p>
      <RouterLink to="/" class="btn btn-primary">Return to Dashboard</RouterLink>
    </div>

    <!-- Country Details -->
    <div v-else class="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <!-- Flag -->
      <div class="card overflow-hidden">
        <img
          :src="country.flags.svg"
          :alt="`Flag of ${country.name.common}`"
          class="w-full h-auto"
        />
      </div>

      <!-- Info -->
      <div>
        <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          {{ country.name.common }}
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mb-6">
          {{ country.name.official }}
        </p>

        <div class="grid sm:grid-cols-2 gap-6 mb-8">
          <!-- Left Column -->
          <div class="space-y-3">
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Native Name:</span>
              {{ Object.values(country.name)[0] || country.name.common }}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Population:</span>
              {{ country.population.toLocaleString() }}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Region:</span>
              {{ country.region }}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Sub Region:</span>
              {{ country.subregion || 'N/A' }}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Capital:</span>
              {{ country.capital?.join(', ') || 'N/A' }}
            </p>
          </div>

          <!-- Right Column -->
          <div class="space-y-3">
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Area:</span>
              {{ formatArea(country.area) }}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Languages:</span>
              {{ getLanguages(country) || 'N/A' }}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Currencies:</span>
              {{ getCurrencies(country) || 'N/A' }}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Timezones:</span>
              {{ country.timezones?.slice(0, 3).join(', ') }}{{ country.timezones?.length > 3 ? '...' : '' }}
            </p>
            <p class="text-slate-700 dark:text-slate-300">
              <span class="font-semibold">Landlocked:</span>
              {{ country.landlocked ? 'Yes' : 'No' }}
            </p>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="card p-4 text-center">
            <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {{ formatPopulation(country.population) }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400">Population</p>
          </div>
          <div class="card p-4 text-center">
            <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {{ (country.area / 1e6).toFixed(2) }}M
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400">km² Area</p>
          </div>
          <div class="card p-4 text-center">
            <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {{ Math.round(country.population / country.area) }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400">Pop/km²</p>
          </div>
        </div>

        <!-- Border Countries -->
        <div v-if="borderCountries.length > 0">
          <h2 class="font-semibold text-slate-900 dark:text-white mb-3">Border Countries:</h2>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              v-for="border in borderCountries"
              :key="border.cca3"
              :to="{ name: 'CountryDetail', params: { code: border.cca3 } }"
              class="btn btn-secondary text-sm"
            >
              {{ border.name.common }}
            </RouterLink>
          </div>
        </div>

        <div v-else class="text-slate-500 dark:text-slate-400">
          <p class="italic">This country has no land borders (island nation or isolated territory)</p>
        </div>
      </div>
    </div>
  </div>
</template>
