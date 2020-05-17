// TODO - Add prefs settings (units, ???)

<template>
  <div id="app" class="xl:mx-56 lg:mx-40 md:mx-16 sm:mx-12 mx-8">
    <div class="flex justify-between">
      <div>
        <h1 class="text-4xl font-semibold">Your weather</h1>
        <!-- Display Location -->
        <h2 class="text-lg ml-2">{{ updateLocation }}</h2>
        <div class="ml-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-map-pin"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <h2 class="text-sm ml-2 flex">
            {{ this.$store.getters.latLong.replace(',', ', ') }}
          </h2>
        </div>
      </div>
      <search-location v-on:get-current-forecast="getAllForecasts" v-on:get-forecast="getForecast"></search-location>
    </div>
    <hr class="my-4" />
    <today
      v-if="isLoaded"
      :location="location"
      :todayData="todayData"
      :forecastObj="forecastObj"
      :rawForecastData="rawForecastData"
    >
      <template v-slot:location>{{ location }}</template>
      <template v-slot:latLong>{{ latLong }}</template>
    </today>
    <hr class="my-6" />
    <ten-day-forecast></ten-day-forecast>
    <footer class="text-center text-sm text-gray-700 mb-8">
      Made by Jake Pfaffenroth in Bellingham, Washington
    </footer>
  </div>
</template>

<script>
// import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import TenDayForecast from './components/TenDayForecast.vue';
import SearchLocation from './components/SearchLocation.vue';
// import Modal from './components/Modal.vue';

export default {
  name: 'App',
  data() {
    return {
      // apiCurrentBase: 'https://api.weather.com/v3/wx/observations/current?geocode=',
      // units: '&units=e',
      // TODO - function and elements to choose C or F and update this
      // apiUrlPrefs: '&language=en-US&format=json&apiKey=',
      apiKey: 'ch7vlfoC5wbg4M9JL8H337h6lCLnaYKr',
      hereApiKey: '4_VZbS686wPPia11Fqt5kv-fBxOa5iCQ6d3leNFA_s4',
      todayData: [],
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
    // Modal,
  },
  computed: {
    updateLocation() {
      return this.$store.getters.city + ', ' + this.$store.getters.usState;
    },

    updateWeatherData() {
      return this.getAllForecasts();
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
          this.getHourlyForecast();
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
    // TODO - make getAllForecasts work so I can update everything at once
    splitLatLong() {
      let latLongArray = this.$store.getters.latLong.split(',');
      this.lat = latLongArray[0];
      this.long = latLongArray[1];
    },

    getAllForecasts() {
      /**/ console.log('test');
      this.splitLatLong();

      this.getCurrentForecast();
      this.getHourlyForecast();
      this.getDailyForecast();
    },
    // Fetches Current forecast and saves to Vuex store
    getCurrentForecast() {
      /**/ console.log('fetching for ' + this.$store.getters.latLong);
      /**/ console.log('...realtime');
      // let url = this.apiCurrentBase + this.$store.getters.latLong + this.units + this.apiUrlPrefs + this.apiKey;
      let url =
        'https://api.climacell.co/v3/weather/realtime?lat=' +
        this.lat +
        '&lon=' +
        this.long +
        '&unit_system=us&fields=precipitation,precipitation_type,temp,feels_like,dewpoint,wind_speed,wind_gust,baro_pressure,visibility,humidity,wind_direction,sunrise,sunset,cloud_cover,cloud_ceiling,cloud_base,surface_shortwave_radiation,moon_phase,weather_code&apikey=ch7vlfoC5wbg4M9JL8H337h6lCLnaYKr';
        /**/ console.log(url);
      fetch(url, { mode: 'cors', 'User-Agent': 'JPWeatherApp' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.isLoaded = true;
          this.$store.commit('updateCurrentForecast', data);
        });
    },

    // Fetches Hourly forecast and saves to Vuex store
    getHourlyForecast() {
      /**/ console.log('...hourly');
      let url =
        'https://api.climacell.co/v3/weather/forecast/hourly?lat=' +
        this.lat +
        '&lon=' +
        this.long +
        '&unit_system=us&start_time=now&fields=temp,feels_like,precipitation,precipitation_type,precipitation_probability,cloud_cover,wind_speed,wind_direction,wind_gust,weather_code&apikey=ch7vlfoC5wbg4M9JL8H337h6lCLnaYKr';

      fetch(url, { mode: 'cors', 'User-Agent': 'JPWeatherApp' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Adds internal myId property to day objects
          for (let index = 0; index < data.length; index++) {
            data[index].date = addDays(new Date(), index + 1);
            data[index].myId = index;
          }

          this.$store.commit('updateHourlyForecast', data);
        });
    },

    // Fetches Daily forecast and saves to Vuex store
    getDailyForecast() {
      /**/ console.log('...daily');
      let url =
        'https://api.climacell.co/v3/weather/forecast/daily?lat=' +
        this.lat +
        '&lon=' +
        this.long +
        '&unit_system=us&start_time=now&fields=temp%2Cprecipitation%2Cweather_code%2Cfeels_like&apikey=ch7vlfoC5wbg4M9JL8H337h6lCLnaYKr';

      fetch(url, { mode: 'cors', 'User-Agent': 'JPWeatherApp' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Pushes today data to Today Object before removing today from daily forecast
          this.todayData = data[0];

          // Removes today from Daily Forecast
          data.splice(0, 1);

          // Adds internal myId property to day objects
          for (let index = 0; index < data.length; index++) {
            data[index].date = addDays(new Date(), index + 1);
            data[index].myId = index;
          }
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 40px;
}
</style>
