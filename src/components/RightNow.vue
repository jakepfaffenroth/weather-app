<template>
  <div>
    <h2 class="text-2xl font-medium">Right Now</h2>
    <div class="flex items-center ml-2 sm:text-lg text-xl">
      <weather-icon v-if="isLoaded" :isLoaded="isLoaded" :narrative="narrative" :isNight="isNight"></weather-icon>
      <p class="pb-px ml-4 sm:text-4xl text-4xl">{{ this.temp }}<span v-html="degreeSymbol"></span></p>
      <div class="ml-6 sm:ml-4">
        <div class="flex items-end">
          <p class="pb-px font-thin">Feels like</p>
          <p class="ml-2 font-light pb-px">{{ feelsLike }}<span v-html="degreeSymbol"></span></p>
        </div>
        <p class="text-md">
          {{ narrative }}
        </p>
      </div>
      <div class="flex ml-2 space-x-6"></div>
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
      temp: '',
      feelsLike: '',
      narrative: '',
      degreeSymbol: '&#176',
      isLoaded: false,
    };
  },
  computed: {
    isNight() {
      // Display night version of icon if after 7pm
      return Number(format(new Date(), 'H')) >= 19 ? 'nt_' : '';
    },
  },
  methods: {
    updateTemp() {
      // this.temp = this.$store.getters.realtimeForecast.temp.value.toFixed();
    },
    updateFeelsLike: function () {
      this.feelsLike = this.$store.getters.realtimeForecast.feels_like.value.toFixed();
    },
    updateNarrative() {
      let str = this.$store.getters.realtimeForecast.weather_code.value.replace('_', ' ');
      this.narrative = str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  async created() {
    this.temp = await this.$store.getters.realtimeForecast.temp.value.toFixed();
    this.updateFeelsLike();
    this.updateNarrative();
  },
  mounted() {
    this.isLoaded = true;
  },
};
</script>

<style></style>
