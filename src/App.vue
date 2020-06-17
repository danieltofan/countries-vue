<template>
	<div id="app">
		<b-navbar :variant="navbarVariant" :type="navbarVariant" fixed="top">
			<b-navbar-brand tag="h3" @click="reset">Where in the world?</b-navbar-brand>

			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown right no-caret ref="dropdown">
					<template v-slot:button-content>
						<b-icon-gear-fill
							font-scale="2"
							:variant="gearVariant"
						/>
					</template>

					<b-dropdown-form class="text-09">
						<b-form-checkbox
							v-model="isDark"
							name="switch-dark"
							class="toggle-dark-input text-center"
							:button-variant="toggleDarkVariant"
							@change="toggleBodyClass(isDark)"
							button
						>
							Toggle dark mode
						</b-form-checkbox>

						<b-dropdown-divider
							v-if="selectedRegion"
						></b-dropdown-divider>

						<b-form-group
							v-if="selectedRegion"
							label="Flag image style"
							class="text-center"
						>
							<b-form-radio-group
								v-model="flagBgSize"
								:options="['cover', 'contain']"
								name="flag-bg-size"
								buttons
								@change="hideMenu"
							></b-form-radio-group>
						</b-form-group>
					</b-dropdown-form>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-navbar>

		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import RegionDisplay from './components/RegionDisplay'
import { mapActions, mapState } from 'vuex'

export default {
	components: {
		RegionDisplay
	},
	computed: {
		...mapState(['selectedRegion']),
		isDark: {
			get() {
				return this.$store.state.isDarkMode
			},
			set(value) {
				this.$store.commit('setDarkMode', value)
			}
		},
		flagBgSize: {
			get() {
				return this.$store.state.flagBgSize
			},
			set(value) {
				this.$store.commit('setFlagBgSize', value)
			}
		},
		navbarVariant() {
			return this.isDark ? 'dark' : 'light'
		},
		gearVariant() {
			return this.isDark ? 'light' : 'dark'
		},
		toggleDarkVariant() {
			return this.isDark ? 'dark' : 'outline'
		}
	},
	methods: {
		...mapActions(['getCountries']),
		toggleBodyClass(isDark) {
			const body = document.body
			body.classList.remove(isDark ? 'body-dark' : 'body-light')
			body.classList.add(isDark ? 'body-light' : 'body-dark')
			this.$refs.dropdown.hide()
		},
		hideMenu(value) {
			this.$refs.dropdown.hide()
		},
		reset() {
			this.$store.commit('setRegion', null)
		}
	},
	mounted() {
		const body = document.body
		body.classList.remove('body-dark')
		body.classList.remove('body-light')
		this.getCountries()
	}
}
</script>

<style lang="scss">
body,
.navbar,
.b-icon {
	transition: background-color 0.3s;
}

h3.navbar-brand:hover {
	cursor: pointer;
}

#app {
	font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	min-height: calc(100vh - 60px);
	margin: 60px auto 0;
	padding: 40px;
}

.body-dark {
	background-color: #212e37;
}

.body-light {
	background-color: aliceblue;
}

.toggle-dark-input {
	width: 160px;
}

.toggle-dark-input label {
	transition: all 0s;
}

form:focus,
.b-dropdown-form:focus {
	outline: none !important;
}

.text-09,
.text-09 label {
	font-size: 0.9rem;
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
