// TODO - Add prefs settings (units, ???)

<template>
  <div id="app" class="xl:mx-56 lg:mx-40 md:my-10 md:mx-16 sm:mx-12 sm:my- mx-4 my-4">
    <h1 class="text-4xl font-semibold hidden sm:block">
      Your weather<span v-if="isDevMode" class="text-red-500">*</span>
    </h1>
    <div class="sm:flex sm:justify-between my-4 sm:pb-2 sm:border-b sm:border-blue-400">
      <!-- Mobile-only locations and btns section -->
      <div class="flex sm:hidden">
        <div class="flex justify-between pb-1 mb-2 w-full border-b border-blue-400">
          <div class="flex items-center">
            <!-- Display Location Name-->
            <h2 class="sm:mt-0 sm:ml-2 text-sm sm:text-lg">{{ updateLocation }}</h2>
            <!-- Display Lat Long -->
            <div class="ml-4 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 30 23"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-map-pin self-center h-auto"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h2 class="text-sm  flex">
                {{ this.$store.getters.latLong.replace(',', ', ') }}
              </h2>
            </div>
          </div>
          <!-- Buttons -->
          <search-location v-on:get-weather-data="getWeatherData" class="justify-end"></search-location>
        </div>
      </div>
      <!-- Right Now section -->
      <right-now v-if="isRealtimeLoaded" :isRealtimeLoaded="isRealtimeLoaded"></right-now>
      <!-- Larger screen only location and btns section -->
      <div class="hidden sm:block">
        <div>
          <!-- Display Location Name-->
          <h2 class="mt-6 ml-2 sm:mt-0 sm:text-lg text-sm ">{{ updateLocation }}</h2>
          <!-- Display Lat Long -->
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
              {{ updateLatLong }}
            </h2>
          </div>
        </div>
        <!-- Buttons -->
        <search-location v-on:update-display="updateDisplay" v-on:get-forecast="getWeatherData"></search-location>
      </div>
    </div>

    <!-- Today Tomorrow Section and below -->
    <today-tomorrow v-if="isDailyLoaded && isHourlyLoaded" class="mb-6"></today-tomorrow>
    <!-- <hr class="my-6 border-blue-400" /> -->
    <ten-day-forecast v-if="isDailyLoaded"></ten-day-forecast>
    <footer class="text-center text-sm text-gray-700 mb-8">
      <p>Made by Jake Pfaffenroth in Bellingham, Washington</p>
    </footer>
    <p v-if="isDevMode" class="text-red-500 absolute top-0 mx-auto">SAFE MODE -- STATIC WEATHER DATA</p>
  </div>
</template>

<script>
import axios from 'axios';
// import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import { realtimeDevJson, nowcastDevJson, hourlyDevJson, dailyDevJson } from './assets/devJSON.js';
import RightNow from './components/RightNow.vue';
import TodayTomorrow from './components/TodayTomorrow.vue';
import TenDayForecast from './components/TenDayForecast.vue';
import SearchLocation from './components/SearchLocation.vue';

export default {
  name: 'App',
  data() {
    return {
      // TODO - remove all the unused data
      isDevMode: false,
      units: 'imperial',
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
      isRealtimeLoaded: false,
      isNowcastLoaded: false,
      isHourlyLoaded: false,
      isDailyLoaded: false,
      pointsURL: '',
    };
  },
  components: {
    RightNow,
    TodayTomorrow,
    TenDayForecast,
    SearchLocation,
  },
  computed: {
    updateLocation() {
      return this.$store.getters.city + ', ' + this.$store.getters.usState;
    },
    updateLatLong() {
      return this.$store.getters.latLong.replace(',', ', ');
    },
    // updateWeatherData() {
    //   return this.getAllForecasts();
    // },
  },
  methods: {
    async getWeatherData() {
      // If Dev Mode turned on, load static data without calling server
      if (this.isDevMode) {
        console.log('Manual Dev Mode')
        this.loadStaticData();
        return;
      }

      // Dev Mode is off; Proceed to get GPS coordinates
      const coordinates = await this.$getLocation();
      // Call server
      try {
        const axiosRes = await axios({
          method: 'POST',
          url: process.env.VUE_APP_SERVER,
          data: JSON.stringify({
            latLong: coordinates.lat.toFixed(2) + ',' + coordinates.lng.toFixed(2),
            isDevMode: this.isDevMode,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        // Server available but responded with error msg
        if (axiosRes.status !== 200) {
          console.log('Error! Server is online but returned ', axiosRes.status, axiosRes.statusText);
          this.isDevMode = true;
          return this.loadStaticData();
        }
        // Server response and weather data are good
        else {
          this.updateDisplay(axiosRes.data);
        }
      } catch (err) {
        // Server unavailable, load static data
        console.log('Error! Server is offline');
        this.isDevMode = true;
        this.loadStaticData();
      }
    },

    // Renders data on the screen
    updateDisplay(data) {
      // If any recieved data is static then isDevMode = true
      if (data.isStatic) {
        console.log('Error! Server is online, but weather API call failed');
        console.log('... Probably exceeded rate limit');
        this.isDevMode = true;
        return this.loadStaticData();
      }
      this.$store.commit('updateLatLong', data.geo.lat + ', ' + data.geo.long);
      this.$store.commit('updateCity', data.geo.city);
      this.$store.commit('updateUsState', data.geo.state);
      this.location = data.geo.city + ', ' + data.geo.state;

      this.$store.commit('updateRealtimeForecast', data.realtime);
      this.$store.commit('updateNowcastForecast', data.nowcast);
      this.$store.commit('updateHourlyForecast', data.hourly);
      this.$store.commit('updateDailyForecast', data.daily);
      this.sectionsAreLoaded();
    },

    // Marks that all sections are loaded and ready to render
    sectionsAreLoaded() {
      this.isRealtimeLoaded = true;
      this.isNowcastLoaded = true;
      this.isHourlyLoaded = true;
      this.isDailyLoaded = true;
    },

    // Load static data on error for dev purposes
    loadStaticData() {
      console.log('DEV MODE - Loading static weather data');

      // Adds myId to each hour of hourlyForecast
      for (let index = 0; index < hourlyDevJson.length; index++) {
        hourlyDevJson[index].myId = index;
      }
      // Adds myId to each day of dailyForecast
      for (let index = 0; index < dailyDevJson.length; index++) {
        dailyDevJson[index].date = addDays(new Date(), index);
        dailyDevJson[index].myId = index;
      }
      this.$store.commit('updateLatLong', '48.71, -122.45');
      this.$store.commit('updateCity', 'Bellingham');
      this.$store.commit('updateUsState', 'WA');
      this.location = 'Bellingham, WA';

      this.$store.commit('updateRealtimeForecast', realtimeDevJson);
      this.$store.commit('updateNowcastForecast', nowcastDevJson);
      this.$store.commit('updateHourlyForecast', hourlyDevJson);
      this.$store.commit('updateDailyForecast', dailyDevJson);

      this.sectionsAreLoaded();
    },

    testLocalStorage() {
      axios.get('');
      localStorage.setItem('location', 'Bellingham, WA');
    },
  },

  // getNarratives() {
  //   let url = 'https://api.weather.gov/points/' + this.$store.getters.latLong;

  //   fetch(url, { mode: 'cors', 'User-Agent': 'JPWeatherApp' })
  //     .then((response) => {
  //       /**/ console.log(response);
  //       return response.json();
  //     })
  //     .then((url) => {
  //       fetch(url.properties.forecast)
  //         .then((response) => {
  //           /**/ console.log(url);

  //           return response.json();
  //         })
  //         .then((data) => {
  //           /**/ console.log(data);
  //           /**/ console.log(typeof data.properties.periods);

  //           this.$store.commit('updateTodayDayNarrative', data.properties.periods);
  //         });
  //     });
  // },

  created() {
    this.getWeatherData();
    this.testLocalStorage();
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
}
</style>
