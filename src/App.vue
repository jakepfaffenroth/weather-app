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
          <search-location
            v-on:get-weather-data="getWeatherData"
            v-on:get-forecast="getForecast"
            class="justify-end"
          ></search-location>
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
        <search-location v-on:update-display="updateDisplay" v-on:get-forecast="connectServer"></search-location>
      </div>
    </div>

    <!-- Today Tomorrow Section and below -->
    <today-tomorrow v-if="isDailyLoaded && isHourlyLoaded" class="mb-6"></today-tomorrow>
    <!-- <hr class="my-6 border-blue-400" /> -->
    <ten-day-forecast v-if="isDailyLoaded"></ten-day-forecast>
    <footer class="text-center text-sm text-gray-700 mb-8">
      <p>Made by Jake Pfaffenroth in Bellingham, Washington</p>
      <p>Version 2020.1</p>
    </footer>
    <p v-if="isDevMode" class="text-red-500 absolute top-0 mx-auto">SAFE MODE -- STATIC WEATHER DATA</p>
    <button v-if="isDevMode" @click="connectServer" class="text-red-500 absolute top-0 right-0 mr-6 border">
      Test Server
    </button>
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
    updateLatLong(){
      return this.$store.getters.latLong.replace(',', ', ')
    },
    updateWeatherData() {
      return this.getAllForecasts();
    },
  },
  methods: {
    async connectServer() {
      const coordinates = await this.$getLocation();
      this.lat = parseFloat(coordinates.lat.toFixed(2));
      this.long = parseFloat(coordinates.lng.toFixed(2));
      // this.latLong = `${this.lat},${this.long}`;
      const body = {
        latLong: coordinates.lat.toFixed(2) + ',' + coordinates.lng.toFixed(2),
        isDevMode: this.isDevMode,
      };
      const url = process.env.VUE_APP_SERVER;
      const options = {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };

      fetch(url, options)
        .then((response) => {
          let myStatus = response.status;
          if (myStatus !== 200) {
            return console.log('Server connection error!');
          } else {
            return response.json();
          }
        })
        .then((data) => {
          this.updateDisplay(data);
        });
    },

    // Renders data on the screen
    updateDisplay(data) {
      console.log('data: ', data);
      // If any weather is static then isDevMode = true
      if (data.isStatic) {
        this.isDevMode = true;
        console.log('DevMode: ', this.isDevMode);
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

    // METHODS BELOW DO NOTHING - MOVED TO SERVER
    async getForecast() {
      const coordinates = await this.$getLocation();
      this.lat = parseFloat(coordinates.lat.toFixed(2));
      this.long = parseFloat(coordinates.lng.toFixed(2));
      // this.latLong = `${this.lat},${this.long}`;
      this.latLong = coordinates.lat.toFixed(2) + ',' + coordinates.lng.toFixed(2);
      // this.$store.commit('updateLatLong', latLong);
      // return this.$store.getters.latLong

      await this.reverseGeocode();
      this.getWeatherData();
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

    splitLatLong() {
      let latLongArray = this.$store.getters.latLong.split(',');
      this.lat = latLongArray[0];
      this.long = latLongArray[1];
    },

    getWeatherData() {
      this.splitLatLong();

      if (this.isDevMode) {
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

        this.$store.commit('updateRealtimeForecast', realtimeDevJson);
        this.$store.commit('updateNowcastForecast', nowcastDevJson);
        this.$store.commit('updateHourlyForecast', hourlyDevJson);
        this.$store.commit('updateDailyForecast', dailyDevJson);

        // Components don't render until these are true
        this.isRealtimeLoaded = true;
        this.isNowcastLoaded = true;
        this.isHourlyLoaded = true;
        this.isDailyLoaded = true;

        return;
      }

      this.getRealtimeForecast();
      // TODO - Nowcast is turned off until implemented to save API calls
      // this.getNowcastForecast();
      this.getHourlyForecast();
      this.getDailyForecast();
    },

    getRealtimeForecast() {
      /**/ console.log('fetching for ' + this.$store.getters.latLong);
      /**/ console.log('...realtime');

      let url =
        'https://api.climacell.co/v3/weather/realtime?lat=' +
        this.lat +
        '&lon=' +
        this.long +
        '&unit_system=us&fields=precipitation,precipitation_type,temp,feels_like,dewpoint,wind_speed,wind_gust,baro_pressure,visibility,humidity,wind_direction,sunrise,sunset,cloud_cover,cloud_ceiling,cloud_base,surface_shortwave_radiation,moon_phase,weather_code&apikey=' +
        process.env.VUE_APP_WEATHER_API;

      fetch(url)
        .then((response) => {
          let myStatus = response.status;
          if (myStatus !== 200) {
            return realtimeDevJson;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          this.isRealtimeLoaded = true;
          this.$store.commit('updateRealtimeForecast', data);
        });
    },

    getNowcastForecast() {
      /**/ console.log('...nowcast');

      let url =
        'https://api.climacell.co/v3/weather/nowcast?lat=' +
        this.lat +
        '&lon=' +
        this.long +
        '&unit_system=us&fields=temp,feels_like,precipitation,precipitation_type,cloud_cover,wind_speed,wind_direction,wind_gust,weather_code&apikey=' +
        process.env.VUE_APP_WEATHER_API;

      fetch(url)
        .then((response) => {
          let myStatus = response.status;
          if (myStatus !== 200) {
            return nowcastDevJson;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          this.isNowcastLoaded = true;
          this.$store.commit('updateNowcastForecast', data);
        });
    },

    getHourlyForecast() {
      /**/ console.log('...hourly');

      let url =
        'https://api.climacell.co/v3/weather/forecast/hourly?lat=' +
        this.lat +
        '&lon=' +
        this.long +
        '&unit_system=us&start_time=now&fields=precipitation,precipitation_type,precipitation_probability,temp,feels_like,dewpoint,wind_speed,wind_gust,baro_pressure,visibility,humidity,wind_direction,sunrise,sunset,cloud_cover,cloud_ceiling,cloud_base,surface_shortwave_radiation,moon_phase,weather_code&apikey=' +
        process.env.VUE_APP_WEATHER_API;

      fetch(url)
        .then((response) => {
          let myStatus = response.status;
          if (myStatus !== 200) {
            return hourlyDevJson;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          for (let index = 0; index < data.length; index++) {
            data[index].myId = index;
          }

          this.isHourlyLoaded = true;
          this.$store.commit('updateHourlyForecast', data);
        });
    },

    getDailyForecast() {
      /**/ console.log('...daily');

      let url =
        'https://api.climacell.co/v3/weather/forecast/daily?lat=' +
        this.lat +
        '&lon=' +
        this.long +
        '&unit_system=us&fields=precipitation,precipitation_accumulation,temp,feels_like,wind_speed,baro_pressure,visibility,humidity,wind_direction,sunrise,sunset,moon_phase,weather_code&apikey=' +
        process.env.VUE_APP_WEATHER_API;

      fetch(url)
        .then((response) => {
          let myStatus = response.status;
          if (myStatus !== 200) {
            this.isDevMode = true;
            console.log('RATE LIMITED or ERROR -- Loading static weather data');
            return dailyDevJson;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          // // Removes today from Daily Forecast
          // data.splice(0, 1);

          for (let index = 0; index < data.length; index++) {
            data[index].date = addDays(new Date(), index);
            data[index].myId = index;
          }
          this.isDailyLoaded = true;
          this.$store.commit('updateDailyForecast', data);
        });
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
    this.connectServer();
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
