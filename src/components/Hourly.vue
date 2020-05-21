<template>
  <div>
    <!-- <h3 class="ml-2 text-lg  font-medium">Hourly</h3> -->
    <div id="hourly-scroller" class="ml- mb-4 overflow-x-auto scrolling-touch">
      <div class="flex space-x-10 mb-4">
        <div class="text-center" v-for="hourIndex in this.$store.getters.hourlyForecast" :key="hourIndex.myId">
          <p class="text-xs font-light h-4 overflow-x-auto">{{ getDate(hourIndex.observation_time.value) }}</p>
          <h3 class="text-md font-medium">{{ getHour(hourIndex.observation_time.value) }}</h3>
          <!-- Weather icons -->
          <weather-icon
            v-if="isLoaded"
            :isLoaded="isLoaded"
            :narrative="updateNarrative(hourIndex)"
            :isNight="isNight(hourIndex)"
            class="h-8 mx-auto"
          ></weather-icon>
          <!-- Hourly temp -->
          <p class="text-sm">{{ hourIndex.temp.value.toFixed() }}<span v-html="degreeSymbol"></span></p>
          <!-- Precip info -->
          <p class="text-xs text-blue-500">{{ getPrecipProbability(hourIndex) }}</p>
          <p class="text-xs text-blue-500">{{ getPrecipVolume(hourIndex) }}</p>
        </div>
      </div>
      <!-- Hourly chart -->
      <hourly-chart :isHourlyLoaded="isHourlyLoaded"></hourly-chart>
    </div>
  </div>
</template>

<script>
import HourlyChart from './HourlyChart.vue';
import WeatherIcon from './WeatherIcon.vue';
import format from 'date-fns/format';
export default {
  components: {
    HourlyChart,
    WeatherIcon,
  },
  props: {
    forecastObj: Array,
  },
  data() {
    return {
      degreeSymbol: '&#176',
      isHourlyLoaded: false,
      isLoaded: false,
    };
  },
  computed: {
    updateTemp: function () {
      return this.$store.getters.hourlyForecast.temp.toFixed();
    },
  },
  methods: {
    getHour(x) {
      return format(new Date(x), 'ha').toLowerCase();
    },
    getDate(x) {
      if (format(new Date(x), 'H').toLowerCase() == 0) {
        return format(new Date(x), 'E');
      }
    },
    getPrecipProbability(x) {
      if (x.precipitation_probability.value > 0) {
        return x.precipitation_probability.value + '%';
      }
    },
    getPrecipVolume(x) {
      if (x.precipitation_probability.value > 0 && x.precipitation.value < 0.01) {
        return '<0.01';
      } else if (x.precipitation_probability.value > 0 && x.precipitation.value > 0) {
        return x.precipitation.value.toFixed(2);
      }
    },
    updateNarrative(hourIndex) {
      let str = hourIndex.weather_code.value.replace('_', ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    isNight(hourIndex) {
      // Display night version of icon before sunrise and after sunset
      const time = hourIndex.observation_time.value;
      const sunrise = format(new Date(hourIndex.sunrise.value), 'H')
      const sunset = format(new Date(hourIndex.sunset.value), 'H')
      return Number(format(new Date(time), 'H')) <= sunrise || Number(format(new Date(time), 'H')) >= sunset ? 'nt_' : '';
    },
  },
  mounted() {
    this.isHourlyLoaded = true;
    this.isLoaded = true;
  },
};
</script>

<style></style>
