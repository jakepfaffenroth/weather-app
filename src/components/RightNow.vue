<template>
  <div class='flex-grow'>
    <h2 class="text-2xl font-medium">Right Now</h2>
    <!-- Weather info -->
    <div class="flex flex-wrap sm:flex-no-wrap ml-2 w-full items-center sm:text-lg text-xl">
      <!-- Main weather info -->
      <div class="flex">
        <!-- Weather icon -->
        <weather-icon
          v-if="isLoaded"
          :isLoaded="isLoaded"
          :narrative="updateNarrative"
          :isNight="isNight"
          class="sm:h-16 h-20 pb-1"
        ></weather-icon>
        <!-- Current temp -->
        <p class="pb-px ml-4 sm:text-4xl text-4xl">{{ updateTemp }}<span v-html="degreeSymbol"></span></p>
        <!-- Feels like & narrative -->
        <div class="ml-6 sm:ml-6 sm:w-full">
          <p class="pb-px font-thin">
            Feels like <span class="font-light">{{ updateFeelsLike }}<span v-html="degreeSymbol"></span></span>
          </p>
          <p class="font-light">
            {{ updateNarrative }}
          </p>
        </div>
      </div>
      <!-- Other weather data -->
      <div class="flex w-full sm:w-1/4  sm:block text-sm ml-2 mr-6 sm:ml-8 justify-between">
        <div class="flex items-end">
          <p>
            Wind: <span class="font-light">{{ updateWind }} mph</span>
          </p>
          <p class="ml-2 font-light pb-px"></p>
        </div>
        <div class="flex items-end">
          <p>
            Humidity: <span class="font-light">{{ updateHumidity }}%</span>
          </p>
          <p class="ml-2 font-light pb-px"></p>
        </div>
        <div class="flex items-end">
          <p>
            Visibility: <span class="font-light">{{ updateVisibility }} mi</span>
          </p>
          <p class="ml-2 font-light pb-px"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon.vue';
import format from 'date-fns/format';
export default {
  // props: {
  //   isRealtimeLoaded: Boolean,
  // },
  components: {
    WeatherIcon,
  },
  data() {
    return {
      narrative: '',
      degreeSymbol: '&#176',
      isLoaded: false,
    };
  },
  computed: {
    updateTemp() {
      return this.$store.getters.realtimeForecast.temp.value.toFixed();
    },
    updateFeelsLike: function () {
      return this.$store.getters.realtimeForecast.feels_like.value.toFixed();
    },
    isNight() {
      // Display night version of icon before sunrise and after sunset
      const sunrise = format(new Date(this.$store.getters.realtimeForecast.sunrise.value), 'H');
      const sunset = format(new Date(this.$store.getters.realtimeForecast.sunset.value), 'H');
      return Number(format(new Date(), 'H')) <= sunrise || Number(format(new Date(), 'H')) >= sunset ? 'nt_' : '';
    },
    updateNarrative() {
      let str = this.$store.getters.realtimeForecast.weather_code.value.replace(/_/g, ' ');
      if (str.includes('light') || str.includes('heavy')) {
        str = str.split(' ');
        let word = str[str.length-1];
        str.splice(-1, 1)
        str.splice(0, 0, word);
        str = str.join(' ');
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    updateWind() {
      return this.$store.getters.realtimeForecast.wind_speed.value.toFixed();
    },
    updateHumidity() {
      return this.$store.getters.realtimeForecast.humidity.value.toFixed();
    },
    updateVisibility() {
      return this.$store.getters.realtimeForecast.visibility.value.toFixed();
    },
  },
  methods: {
    
    // updateNarrative() {
    //   let str = this.$store.getters.realtimeForecast.weather_code.value.replace('_', ' ');
    //   this.narrative = str.charAt(0).toUpperCase() + str.slice(1);
    // },
  },
  async created() {
    // this.updateTemp();
    // this.updateFeelsLike();
    // this.updateNarrative(˝);
  },
  mounted() {
    this.isLoaded = true;
  },
};
</script>

<style></style>
