<template>
  <div>
    <!-- Display Forecast -->
    <current ></current>
    <today-numerical ></today-numerical>
    <today-summary> </today-summary>
  </div>
</template>

<script>
import TodayNumerical from './TodayNumerical.vue';
import TodaySummary from './TodaySummary.vue';
import Current from './Current.vue';
// import EventBus from '../main.js'

export default {
  props: {
    // location: String,
    // forecastURL: String,
    // forecastObj: Array,
    // rawForecastData: Object,
  },
  data() {
    return {};
  },
  components: {
    TodayNumerical,
    TodaySummary,
    Current,
  },
};
</script>
