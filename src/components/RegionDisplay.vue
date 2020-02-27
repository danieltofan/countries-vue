<template>
	<b-container fluid="xl" class="main-app" key="content">
		<b-row class="inputs-row mb-3" key="controls">
			<b-col lg="6" md="12" class="mb-2">
				<b-input-group>
					<b-input-group-prepend>
						<b-input-group-text
							:class="{
								'bg-dark': isDark,
								'text-light': isDark
							}"
						>
							<b-icon-search
								:variant="isDark ? 'light' : ''"
							></b-icon-search>
						</b-input-group-text>
					</b-input-group-prepend>

					<b-form-input
						:class="{ 'bg-dark': isDark, 'text-light': isDark }"
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
					:class="{ 'bg-dark': isDark, 'text-light': isDark }"
					v-model="filterByRegion"
					:options="regions"
					@change="displayCountriesByRegion"
				></b-form-select>
			</b-col>
		</b-row>

		<b-row class="results-row">
			<transition-group name="fade" mode="out-in">
				<b-spinner
					v-if="loading"
					class="mt-5 mx-auto"
					id="loader"
					variant="primary"
					label="Loading..."
					style="width: 6rem; height: 6rem;"
					key="spinner"
				></b-spinner>
				<b-card-group v-else key="results">
					<flag-display
						v-for="country in countries"
						:key="country.name"
						:country="country"
						:isDark="isDark"
						:flagBgSize="flagBgSize"
						@click.native="goTo(country.name)"
					></flag-display>
				</b-card-group>
			</transition-group>
		</b-row>
	</b-container>
</template>

<script>
import FlagDisplay from './FlagDisplay'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	components: {
		FlagDisplay
	},
	data() {
		return {
			countryName: '',
			regions: [
				{ value: null, html: '<i>Select a geographical region</i>' },
				{ value: 'Africa', text: 'Africa' },
				{ value: 'Americas', text: 'Americas' },
				{ value: 'Asia', text: 'Asia' },
				{ value: 'Europe', text: 'Europe' },
				{ value: 'Oceania', text: 'Oceania' }
			],
			filterByRegion: null,
			countries: null,
			loading: false
		}
	},
	computed: {
		...mapState({
			isDark: 'isDarkMode',
			flagBgSize: 'flagBgSize'
		}),
		...mapGetters([
			'allCountryNames',
			'countryByName',
			'countriesByRegion'
		]),
		invalidCountryName() {
			return !this.allCountryNames.includes(this.countryName)
		}
	},
	methods: {
		clearNameSearch() {
			this.countryName = ''
			this.countries = []
		},
		displayCountry() {
			this.filterByRegion = null
			this.$router.push({
				name: 'Country',
				params: { name: this.countryName }
			})
		},
		displayCountriesByRegion() {
			this.loading = true
			this.countryName = null
			this.countries = this.countriesByRegion(this.filterByRegion)
			this.$store.commit('setDisplayFlagStyle', this.filterByRegion)
			this.loading = false
		},
		goTo(name) {
			this.$router.push({ name: 'Country', params: { name: name } })
		}
	},
	/* mounted() {
		this.getCountries()
	}, */
	destroyed() {
		this.$store.commit('setDisplayFlagStyle', false)
	}
}
</script>

<style scoped>
.custom-select {
	font-size: 0.9rem !important;
}

.custom-select.bg-dark {
	background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='lightgrey' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
		no-repeat right 0.75rem center/8px 10px;
}

.card-group {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
