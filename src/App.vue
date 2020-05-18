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
      <search-location v-on:get-weather-data="getWeatherData" v-on:get-forecast="getForecast"></search-location>
    </div>
    <hr class="my-4" />
    <today v-if="isLoaded"></today>
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
      units: 'imperial',
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
          this.getWeatherData();
          // this.getCurrentForecast();
        });
      // .then(() => {
      //   this.getHourlyForecast();
      // })
      // .then(() => {
      //   this.getDailyForecast();
      //   this.getNarratives();
      // });
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


      
      // Fetch OpenWeatherMap forecasts
      fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          this.lat +
          '&lon=' +
          this.long +
          '&units=' +
          this.units +
          '&appid=c7696966342d568ab42c745734d943df',
        { mode: 'cors', 'User-Agent': 'JPWeatherApp' }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let daysArray = data.daily;
          for (let index = 0; index < daysArray.length; index++) {
            daysArray[index].date = addDays(new Date(), index);
            daysArray[index].myId = index;
          }

          let hoursArray = data.hourly;
          for (let index = 0; index < daysArray.length; index++) {
            hoursArray[index].date = addDays(new Date(), index);
            hoursArray[index].myId = index;
          }
          this.isLoaded = true;

          this.$store.commit('updateOpenWeatherForecast', data);
        });

      // Fetch NOAA data using Lat/Long
      fetch('https://api.weather.gov/points/' + this.$store.getters.latLong, {
        mode: 'cors',
        'User-Agent': 'JPWeatherApp',
      })
        .then((response) => {
          return response.json();
        })

        // Fetch NOAA forecasts
        .then((url) => {
          // Then fetch day/night forecasts
          fetch(url.properties.forecast)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.$store.commit('updateCurrentForecast', data);
            });

          // and fetch hourly forecasts
          fetch(url.properties.forecastHourly)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.$store.commit('updateHourlyForecast', data);
            });

          // and fetch daily forecasts
          fetch(url.properties.forecastGridData)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              let daysArray = data.properties.temperature.values;
              for (let index = 0; index < daysArray.length; index++) {
                daysArray[index].date = addDays(new Date(), index);
                daysArray[index].myId = index;
              }
              this.$store.commit('updateDailyForecast', data);
            });
        });
    },

    // getAllForecasts() {
    //   this.getWeatherData();
    //   //   /**/ console.log('test');
    //   //   this.splitLatLong();

    //   //   this.getCurrentForecast();
    //   //   this.getHourlyForecast();
    //   //   this.getDailyForecast();
    //   //   this.getNarratives();
    // },
    // // Fetches Current forecast and saves to Vuex store
    // getCurrentForecast() {
    //   /**/ console.log('fetching for ' + this.$store.getters.latLong);
    //   /**/ console.log('...realtime');

    //   // let url =
    //   //   'https://api.climacell.co/v3/weather/realtime?lat=' +
    //   //   this.lat +
    //   //   '&lon=' +
    //   //   this.long +
    //   //   '&unit_system=us&fields=precipitation,precipitation_type,temp,feels_like,dewpoint,wind_speed,wind_gust,baro_pressure,visibility,humidity,wind_direction,sunrise,sunset,cloud_cover,cloud_ceiling,cloud_base,surface_shortwave_radiation,moon_phase,weather_code&apikey=ch7vlfoC5wbg4M9JL8H337h6lCLnaYKr';

    //   let url = 'https://api.weather.gov/points/' + this.$store.getters.latLong;

    //   fetch(url, { mode: 'cors', 'User-Agent': 'JPWeatherApp' })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((url) => {
    //       fetch(url.properties.forecast)
    //         .then((response) => {
    //           /**/ console.log(url);

    //           return response.json();
    //         })
    //         .then((data) => {
    //           this.isLoaded = true;
    //           this.$store.commit('updateCurrentForecast', data);
    //         });
    //     });
    // },

    
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
