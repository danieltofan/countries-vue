<script setup>
import { ref, computed } from 'vue'
import { countries, formatPopulation, formatArea, getLanguages, getCurrencies } from '../data/countries'

const country1Code = ref('')
const country2Code = ref('')

const country1 = computed(() => countries.find(c => c.cca3 === country1Code.value))
const country2 = computed(() => countries.find(c => c.cca3 === country2Code.value))

const sortedCountries = computed(() =>
  [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common))
)

const comparisonMetrics = computed(() => {
  if (!country1.value || !country2.value) return []

  return [
    {
      label: 'Population',
      value1: country1.value.population,
      value2: country2.value.population,
      format: formatPopulation,
      winner: country1.value.population > country2.value.population ? 1 : country1.value.population < country2.value.population ? 2 : 0
    },
    {
      label: 'Area (km²)',
      value1: country1.value.area,
      value2: country2.value.area,
      format: (v) => v.toLocaleString(),
      winner: country1.value.area > country2.value.area ? 1 : country1.value.area < country2.value.area ? 2 : 0
    },
    {
      label: 'Population Density',
      value1: Math.round(country1.value.population / country1.value.area),
      value2: Math.round(country2.value.population / country2.value.area),
      format: (v) => v + '/km²',
      winner: 0 // Neutral - neither higher nor lower is "better"
    },
    {
      label: 'Timezones',
      value1: country1.value.timezones?.length || 0,
      value2: country2.value.timezones?.length || 0,
      format: (v) => v.toString(),
      winner: country1.value.timezones?.length > country2.value.timezones?.length ? 1 : country1.value.timezones?.length < country2.value.timezones?.length ? 2 : 0
    },
    {
      label: 'Languages',
      value1: Object.keys(country1.value.languages || {}).length,
      value2: Object.keys(country2.value.languages || {}).length,
      format: (v) => v.toString(),
      winner: 0
    },
    {
      label: 'Border Countries',
      value1: country1.value.borders?.length || 0,
      value2: country2.value.borders?.length || 0,
      format: (v) => v.toString(),
      winner: 0
    }
  ]
})

function swapCountries() {
  const temp = country1Code.value
  country1Code.value = country2Code.value
  country2Code.value = temp
}

function randomize() {
  const shuffled = [...countries].sort(() => Math.random() - 0.5)
  country1Code.value = shuffled[0].cca3
  country2Code.value = shuffled[1].cca3
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <section class="text-center mb-8">
      <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
        Compare Countries
      </h1>
      <p class="text-slate-600 dark:text-slate-400">
        Select two countries to compare their demographics and statistics
      </p>
    </section>

    <!-- Country Selection -->
    <section class="card p-6 mb-8">
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <div class="flex-1 w-full">
          <label for="country1" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            First Country
          </label>
          <select id="country1" v-model="country1Code" class="input">
            <option value="">Select a country...</option>
            <option v-for="c in sortedCountries" :key="c.cca3" :value="c.cca3">
              {{ c.name.common }}
            </option>
          </select>
        </div>

        <div class="flex gap-2 sm:pt-6">
          <button @click="swapCountries" class="btn btn-secondary" title="Swap countries">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
          </button>
          <button @click="randomize" class="btn btn-primary" title="Random countries">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
        </div>

        <div class="flex-1 w-full">
          <label for="country2" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Second Country
          </label>
          <select id="country2" v-model="country2Code" class="input">
            <option value="">Select a country...</option>
            <option v-for="c in sortedCountries" :key="c.cca3" :value="c.cca3">
              {{ c.name.common }}
            </option>
          </select>
        </div>
      </div>
    </section>

    <!-- Comparison Results -->
    <section v-if="country1 && country2">
      <!-- Flags -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="card overflow-hidden">
          <img :src="country1.flags.svg" :alt="country1.name.common" class="w-full h-48 object-cover"/>
          <div class="p-4 text-center">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ country1.name.common }}</h2>
            <p class="text-slate-500 dark:text-slate-400">{{ country1.region }}</p>
          </div>
        </div>
        <div class="card overflow-hidden">
          <img :src="country2.flags.svg" :alt="country2.name.common" class="w-full h-48 object-cover"/>
          <div class="p-4 text-center">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ country2.name.common }}</h2>
            <p class="text-slate-500 dark:text-slate-400">{{ country2.region }}</p>
          </div>
        </div>
      </div>

      <!-- Stats Comparison -->
      <div class="card overflow-hidden">
        <table class="w-full">
          <thead class="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">{{ country1.name.common }}</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Metric</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">{{ country2.name.common }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="metric in comparisonMetrics" :key="metric.label" class="hover:bg-slate-50 dark:hover:bg-slate-800">
              <td class="px-4 py-3 text-left" :class="{ 'text-primary-600 dark:text-primary-400 font-semibold': metric.winner === 1 }">
                {{ metric.format(metric.value1) }}
              </td>
              <td class="px-4 py-3 text-center text-slate-500 dark:text-slate-400 font-medium">
                {{ metric.label }}
              </td>
              <td class="px-4 py-3 text-right" :class="{ 'text-primary-600 dark:text-primary-400 font-semibold': metric.winner === 2 }">
                {{ metric.format(metric.value2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Additional Info -->
      <div class="grid sm:grid-cols-2 gap-4 mt-8">
        <div class="card p-4">
          <h3 class="font-semibold text-slate-900 dark:text-white mb-2">{{ country1.name.common }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">
            <span class="font-medium">Capital:</span> {{ country1.capital?.join(', ') || 'N/A' }}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">
            <span class="font-medium">Languages:</span> {{ getLanguages(country1) || 'N/A' }}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            <span class="font-medium">Currencies:</span> {{ getCurrencies(country1) || 'N/A' }}
          </p>
        </div>
        <div class="card p-4">
          <h3 class="font-semibold text-slate-900 dark:text-white mb-2">{{ country2.name.common }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">
            <span class="font-medium">Capital:</span> {{ country2.capital?.join(', ') || 'N/A' }}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">
            <span class="font-medium">Languages:</span> {{ getLanguages(country2) || 'N/A' }}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            <span class="font-medium">Currencies:</span> {{ getCurrencies(country2) || 'N/A' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-else class="text-center py-12">
      <svg class="w-24 h-24 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
      <p class="text-slate-500 dark:text-slate-400 mb-4">Select two countries above to compare them</p>
      <button @click="randomize" class="btn btn-primary">Try Random Countries</button>
    </section>
  </div>
</template>
