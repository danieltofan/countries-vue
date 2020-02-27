<template>
	<transition name="fade" mode="out-in">
		<b-spinner
			v-if="!country"
			class="mt-5 mx-auto"
			id="loader"
			variant="primary"
			label="Loading..."
			style="width: 6rem; height: 6rem;"
			key="spinner"
		></b-spinner>

		<b-container v-else>
			<b-row class="mb-5">
				<b-button @click="goHome" :variant="isDark ? 'light' : ''"
					><b-icon-arrow-left></b-icon-arrow-left> Home</b-button
				>
			</b-row>

			<b-row>
				<b-col md="4" class="pl-0">
					<figure class="flag-container">
						<transition name="fade" mode="out-in">
							<img :src="country.flag" />
						</transition>
					</figure>
				</b-col>

				<b-col md="6" offset-md="1" class="country-info">
					<h3
						class="text-left mb-3"
						:class="{ 'text-light': isDark }"
					>
						{{ country.name }}
					</h3>

					<section
						class="row country-details mb-4"
						:class="{ 'text-light': isDark }"
					>
						<b-col>
							<p class="text-left mb-1">
								<span class="field-label">Native Name:</span>
								{{ country.nativeName }}
							</p>
							<p class="text-left mb-1">
								<span class="field-label">Population:</span>
								{{ country.population }}
							</p>
							<p class="text-left mb-1">
								<span class="field-label">Region:</span>
								{{ country.region }}
							</p>
							<p class="text-left mb-1">
								<span class="field-label">Sub Region:</span>
								{{ country.subregion }}
							</p>
							<p class="text-left mb-1">
								<span class="field-label">Capital:</span>
								{{ country.capital }}
							</p>
						</b-col>

						<b-col>
							<p class="text-left mb-1">
								<span class="field-label"
									>Top Level Domain:</span
								>
								{{ domains }}
							</p>
							<p class="text-left mb-1">
								<span class="field-label">Currencies:</span>
								{{ currencies }}
							</p>
							<p class="text-left mb-1">
								<span class="field-label">Languages:</span>
								{{ languages }}
							</p>
						</b-col>
					</section>

					<p
						class="text-left mb-1"
						v-if="bordered.length"
						:class="{ 'text-light': isDark }"
					>
						<span class="field-label">Border Countries:</span>
						<b-button
							size="sm"
							:variant="isDark ? 'light' : ''"
							class="router-button mx-1 my-1 p1-0 py-0"
							v-for="bor in bordered"
							:key="bor"
							@click="goTo(bor)"
							>{{ bor | shortName }}</b-button
						>
					</p>
				</b-col>
			</b-row>
		</b-container>
	</transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
	props: ['name'],
	computed: {
		...mapState({
			isDark: 'isDarkMode'
		}),
		country() {
			return this.$store.getters.countryByName(this.name)
		},
		currencies() {
			return this.country.currencies.map(c => c.name).join(', ')
		},
		languages() {
			return this.country.languages.map(c => c.name).join(', ')
		},
		domains() {
			return this.country.topLevelDomain.join(', ')
		},
		bordered() {
			return this.$store.getters.borderCountryNames(this.name)
		}
	},
	methods: {
		goHome() {
			this.$router.push({ name: 'Home' })
		},
		goTo(name) {
			this.$router.push({ name: 'Country', params: { name: name } })
		}
	},
	filters: {
		shortName(value) {
			let i = value.indexOf('(')
			return value.substring(0, i > 0 ? i : value.length)
		}
	}
}
</script>

<style scoped>
.flag-container img {
	width: 100%;
	height: auto;
}

.country-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.field-label {
	font-weight: 500;
}

p,
.router-button {
	font-size: 0.8em;
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
