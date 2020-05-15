<template>
  <div id="app" class="xl:px-48 lg:px-40 md:px-30 sm:px-16 px-8">
    <h1 class="text-4xl">Your weather</h1>
    <!-- Display Location -->
    <h2 class="text-lg">{{ updateLocation }}</h2>
    <h2 class="text-sm">{{ this.$store.getters.latLong }}</h2>
    <search-location></search-location>
    <hr class="my-6" />
    <today v-if="isLoaded" :location="location" :forecastObj="forecastObj" :rawForecastData="rawForecastData">
      <template v-slot:location>{{ location }}</template>
      <template v-slot:latLong>{{ latLong }}</template>
    </today>
    <hr class="my-6" />
    <ten-day-forecast></ten-day-forecast>
    <modal></modal>
  </div>
</template>

<script>
import TenDayForecast from './components/TenDayForecast.vue';
import SearchLocation from './components/SearchLocation.vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  data() {
    return {
      // lat: '48.76',
      // long: '-122.49',
      apiCurrentBase: 'https://api.weather.com/v3/wx/observations/current?geocode=',
      units: '&units=e',
      // TODO - function and elements to choose C or F and update this
      apiUrlPrefs: '&language=en-US&format=json&apiKey=',
      apiKey: 'dc5ea0e10f11465f9ea0e10f11e65fa6',
      hereApiKey: '4_VZbS686wPPia11Fqt5kv-fBxOa5iCQ6d3leNFA_s4',
      apiFullUrl: '',
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
    TenDayForecast,
    SearchLocation,
    Modal,
  },
  computed: {
    updateLocation() {
      return this.$store.getters.city + ', ' + this.$store.getters.usState;
    },

    updateWeatherData() {
      return this.getCurrentForecast();
    },
  },
  methods: {
    getForecast() {
      this.$getLocation()
        .then((coordinates) => {
          this.lat = parseFloat(coordinates.lat.toFixed(2));
          this.long = parseFloat(coordinates.lng.toFixed(2));
          // this.latLong = `${this.lat},${this.long}`;
          let latLong = coordinates.lat.toFixed(2) + ',' + coordinates.lng.toFixed(2);
          this.$store.commit('updateLatLong', latLong);
          // return this.$store.getters.latLong
          return;
        })
        .then(() => {
          this.reverseGeocode();
        })
        .then(() => {
          this.getCurrentForecast();
        })
        .then(() => {
          this.getIntradayForecast();
        })
        .then(() => {
          this.getDailyForecast();
        });
    },
    reverseGeocode() {
      fetch(
        'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=' +
          this.$store.getters.latLong +
          '%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=' +
          this.hereApiKey
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let city = data.Response.View[0].Result[0].Location.Address.City;
          let state = data.Response.View[0].Result[0].Location.Address.State;

          this.$store.commit('updateCity', city);
          this.$store.commit('updateUsState', state);

          this.location = city + ', ' + state;
        });
    },

    // Fetches Current forecast and saves to Vuex store
    getCurrentForecast() {
      let url = this.apiCurrentBase + this.$store.getters.latLong + this.units + this.apiUrlPrefs + this.apiKey;
      fetch(url, { mode: 'cors', 'User-Agent': 'JPWeatherApp' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.isLoaded = true;
          this.$store.commit('updateCurrentForecast', data);
        });
    },

    // Fetches Intraday forecast and saves to Vuex store
    getIntradayForecast() {
      let url =
        'https://api.weather.com/v1/geocode/' +
        this.lat +
        '/' +
        this.long +
        '/forecast/intraday/15day.json?' +
        this.units +
        '&language=en-US&apiKey=' +
        this.apiKey;

      fetch(url, { mode: 'cors', 'User-Agent': 'JPWeatherApp' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.$store.commit('updateIntradayForecast', data);
        });
    },

    // Fetches Daily forecast and saves to Vuex store
    getDailyForecast() {
      let url =
        'https://api.weather.com/v1/geocode/' +
        this.lat +
        '/' +
        this.long +
        '/forecast/daily/15day.json?' +
        this.units +
        '&language=en-US&apiKey=' +
        this.apiKey;

      fetch(url, { mode: 'cors', 'User-Agent': 'JPWeatherApp' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (let index = 0; index < data.forecasts.length; index++) {
            data.forecasts[index].myId = index;
            
          }
          /**/ console.log(data);
          this.$store.commit('updateDailyForecast', data);
        });
    },
  },

  created() {
    this.getForecast();
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
  margin-top: 40px;
}
</style>
