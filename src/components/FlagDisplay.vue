<template>
    <b-card-group deck>
        <b-card sm="12" md="6" lg="4" xl="3" v-for="country in countryList" :key="country.name" :title="country.name" :img-src="country.flag" :img-alt="altCountryFlag(country.name)">
            <b-card-text>
                <h4>{{country.name}}</h4>
                <p>Capital: {{country.capital}}</p>
                <p>Region: {{country.region}}</p>
                <p>Population: {{country.population}}</p>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
    props: ['countryList'],
    methods: {
        altCountryFlag(name) {
            return `${name}'s flag`
        }
    }
}
</script>

<style lang="sass" scoped>

</style>