<template>
  <div>
    <!-- Display Forecast -->
    <current :rawForecastData="rawForecastData"></current>
    <today-numerical :rawForecastData="rawForecastData"></today-numerical>
    <today-summary :forecastObj="forecastObj"> </today-summary>
  </div>
</template>

<script>
import TodayNumerical from './TodayNumerical.vue';
import TodaySummary from './TodaySummary.vue';
import Current from './Current.vue';
// import EventBus from '../main.js'

export default {
  props: {
    location: String,
    forecastURL: String,
    forecastObj: Array,
    rawForecastData: Object,
  },
  data() {
    return {};
  },
  components: {
    TodayNumerical,
    TodaySummary,
    Current,
  },
  // created() {
  //   EventBus.$on('getData', (data)=> {
  //     this.gridObj = data
  //   })
  // },
};
</script>
