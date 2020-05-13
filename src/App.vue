<template>
  <div id="app">
    <today v-if="isLoaded" :location="location" :forecastObj="forecastObj" :rawForecastData="rawForecastData">
      <template v-slot:location>{{ location }}</template>
      <template v-slot:latLong>{{ latLong }}</template>
    </today>
  </div>
</template>

<script>
// import EventBus from './main.js';

export default {
  name: 'App',
  data() {
    return {
      lat: '48.76',
      long: '-122.49',
      // lat: '',
      // long: '',
      latLong: '',
      weatherData: {},
      location: '',
      gridURL: '',
      forecastURL: '',
      rawForecastData: '',
      currentURL: '',
      forecastObj: [],
      forecastName: '',
      forecastSummary: '',
      isLoaded: false,
    };
  },
  components: {
    Today: () => import('./components/Today.vue'),
  },
  created() {
    this.$getLocation().then((coordinates) => {
      console.log(coordinates);
    });
    // function success() {
    //   this.latLong = GeolocationCoordinates.latitude + ',' + GeolocationCoordinates.longitude;
    //   this.lat = position.coords.latitude;
    //   /**/ console.log(this.latLong);
    //   this.long = position.coords.longitude;
    // }

    this.latLong = `${this.lat},${this.long}`;

    fetch(`https://api.weather.gov/points/${this.latLong}`)
      // this.$http
      //   .get('points/' + this.latLong)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.location = `${data.properties.relativeLocation.properties.city}, ${data.properties.relativeLocation.properties.state}`;
        this.gridURL = data.properties.forecastGridData;
        this.forecastURL = data.properties.forecast;
        this.currentURL = data.properties.observationStations;
      })
      .then(() => {
        fetch(this.forecastURL)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let periods = data.properties.periods;
            // EventBus.$emit('getData', periods)
            periods.forEach((period) => {
              this.forecastObj.push(period);
              this.isLoaded = true;
            });
          });
      })
      .then(() => {
        fetch(this.gridURL)
          .then((response) => {
            /**/ console.log(this.gridURL);
            return response.json();
          })
          .then((data) => {
            this.rawForecastData = data.properties;
            /**/ console.log('raw:');
            /**/ console.log(this.rawForecastData);
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
