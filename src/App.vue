<template>
  <div id="app">
    <h1 class="text-3xl">Your weather</h1>
    <!-- Display Location -->
    <h2 class="text-lg">{{ location }}</h2>
    <h2 class="text-sm">{{ latLong }}</h2>
    <search-location></search-location>
    <hr class="my-6" />
    <today v-if="isLoaded" :location="location" :forecastObj="forecastObj" :rawForecastData="rawForecastData">
      <template v-slot:location>{{ location }}</template>
      <template v-slot:latLong>{{ latLong }}</template>
    </today>
    <modal></modal>
  </div>
</template>

<script>
// import EventBus from './main.js';
import SearchLocation from './components/SearchLocation.vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  data() {
    return {
      // lat: '48.76',
      // long: '-122.49',
      lat: '',
      long: '',
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
      pointsURL: '',
    };
  },
  components: {
    Today: () => import('./components/Today.vue'),
    SearchLocation,
    Modal,
  },
  methods:{
    getLocation(){},
    getWeatherData(){}
  },
  beforeMount() {
    this.$getLocation()
      .then((coordinates) => {
        this.lat = parseFloat(coordinates.lat.toFixed(2));
        this.long = parseFloat(coordinates.lng.toFixed(2));
        this.latLong = `${this.lat},${this.long}`;
        return (this.pointsURL = 'https://api.weather.gov/points/' + this.latLong);
      })
      .then((url) => {
        fetch(url, { mode: 'cors' })
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
            fetch(this.forecastURL, { mode: 'cors' })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                let periods = data.properties.periods;
                periods.forEach((period) => {
                  this.forecastObj.push(period);
                  this.isLoaded = true;
                });
              });
          })
          .then(() => {
            fetch(this.gridURL)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                this.rawForecastData = data.properties;
              });
          });
      });
  },
  // mounted() {
  //   GoogleMapsLoader.load(function (google) {
  //     let map = new google.maps.Map(document.getElementById('map'), {
  //       zoom: 15,
  //       center: position,
  //     });
  //   });
  // },
  //   let googlePlacesAPIScript = document.createElement('script');
  //   googlePlacesAPIScript.setAttribute(
  //     'src',
  //     'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZ12-Jzb1NAtzGdWVDkRmBZOVBy1wJff4&libraries=places'
  //   );
  //   document.head.appendChild(googlePlacesAPIScript);
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
