<template>
  <div id="app">
    <today v-if="isLoaded" :location="location" :forecastObj="forecastObj"></today>
  </div>
</template>

<script>
// import Today from './components/Today.vue';

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
      forecastURL: '',
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
    // this.$getLocation().then((coordinates) => {
    //   console.log(coordinates);
    // });
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
        /**/ console.log('response');
        /**/ console.log(response);
        return response.json();
      })
      .then((data) => {
        /**/ console.log(data);
        this.location = `${data.properties.relativeLocation.properties.city}, ${data.properties.relativeLocation.properties.state}`;
        this.forecastURL = data.properties.forecast;
        /**/ console.log(this.forecastURL);
      })
      .then(() => {
        fetch(this.forecastURL)
          .then((response) => {
            /**/ console.log('Today response');
            /**/ console.log(response);
            return response.json();
          })
          .then((data) => {
            let periods = data.properties.periods;
            /**/ console.log(periods);
            periods.forEach((period) => {
              //   let periodName = period.name;
              //   let periodDetails = period.detailedForecast;
              this.forecastObj.push(period);
              /**/ console.log(this.forecastObj);
              this.isLoaded = true;
            });
          });
      });
    //   .then((weatherData) => {
    //     /**/ console.log('data');
    //     /**/ console.log(weatherData);
    //     this.weatherData = weatherData;

    //     this.location = `${this.weatherData.properties.relativeLocation.properties.city}, ${this.weatherData.properties.relativeLocation.properties.state}`;

    //     this.forecastURL = this.weatherData.properties.forecast;
    //   });
    // this.$http
    //   .get(this.forecastURL)
    //   .then((response) => {
    //     /**/ console.log('fcObj: ');
    //     /**/ console.log(this.forecastObj);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     /**/ console.log(data);
    //     this.forecastObj = data;
    //     /**/ console.log(this.forecastObj);

    // this.forecastName = data.properties.periods[0].name;
    // this.forecastSummary = data.properties.periods[0].detailedForecast;
    // });
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
