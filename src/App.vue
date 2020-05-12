<template>
  <div id="app">
    <today :location="location" :forecastObj="forecastObj"></today>
  </div>
</template>

<script>
import Today from './components/Today.vue';

export default {
  name: 'App',
  data() {
    return {
      lat: '48.76',
      long: '-122.49',
      latLong: '',
      weatherData: {},
      location: '',
      forecastURL: '',
      forecastObj: {},
      // forecastName: '',
      // forecastSummary: '',
    };
  },
  components: {
    Today,
  },
  created() {
    this.latLong = `${this.lat},${this.long}`;
    /**/ console.log(this.latLong);

    this.$http
      .get('points/' + this.latLong)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.weatherData = data;
        this.location = `${this.weatherData.properties.relativeLocation.properties.city}, ${this.weatherData.properties.relativeLocation.properties.state}`;
        this.forecastURL = this.weatherData.properties.forecast;
        this.$http
          .get(this.forecastURL)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.forecastObj = data;
            
            /**/ console.log(this.forecastObj);
            // this.forecastName = data.properties.periods[0].name;
            // this.forecastSummary = data.properties.periods[0].detailedForecast;
          });
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
