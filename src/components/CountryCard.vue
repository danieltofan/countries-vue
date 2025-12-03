<script setup>
import { RouterLink } from 'vue-router'
import { formatPopulation } from '../data/countries'

defineProps({
  country: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink
    :to="{ name: 'CountryDetail', params: { code: country.cca3 } }"
    class="card overflow-hidden group"
  >
    <div class="aspect-video bg-slate-100 dark:bg-slate-700 overflow-hidden">
      <img
        :src="country.flags.svg"
        :alt="`Flag of ${country.name.common}`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ country.name.common }}
      </h3>
      <div class="space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <p>
          <span class="font-medium text-slate-700 dark:text-slate-300">Population:</span>
          {{ formatPopulation(country.population) }}
        </p>
        <p>
          <span class="font-medium text-slate-700 dark:text-slate-300">Region:</span>
          {{ country.region }}
        </p>
        <p>
          <span class="font-medium text-slate-700 dark:text-slate-300">Capital:</span>
          {{ country.capital?.join(', ') || 'N/A' }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>
