<template>
  <div>
    <!-- <h3 class="ml-2 text-lg  font-medium">Hourly</h3> -->
    <div id="ten-day-scroller" class="flex flex-no-wrap space-x-10 ml-2 overflow-x-auto scrolling-touch">
      <div class="text-center" v-for="hourIndex in this.$store.getters.hourlyForecast" :key="hourIndex.myId">
        <h3 class="text-md font-medium">{{ getHour(hourIndex.observation_time.value) }}</h3>
        <p class="text-md">{{ hourIndex.temp.value.toFixed() }}<span v-html="degreeSymbol"></span></p>
        <p class="text-sm">{{ hourIndex.precipitation_probability.value }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
export default {
  props: {
    forecastObj: Array,
  },
  data() {
    return {
      degreeSymbol: '&#176',
    };
  },
  methods: {
    getHour(x) {
      return format(new Date(x), 'ha').toLowerCase();
    },
  },
};
</script>

<style></style>
