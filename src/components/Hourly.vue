<template>
  <div>
    <!-- <h3 class="ml-2 text-lg  font-medium">Hourly</h3> -->
    <div id="hourly-scroller" class="flex flex-no-wrap space-x-10 ml-2 mb-4 overflow-x-auto scrolling-touch">
      <div
        class="text-center"
        v-for="hourIndex in this.$store.getters.openWeatherForecast.hourly"
        :key="hourIndex.dt"
      >
        <p class="text-xs font-light h-4 overflow-x-auto">{{ getDate(hourIndex.dt) }}</p>
        <h3 class="text-md font-medium">{{ getHour(hourIndex.dt) }}</h3>
        <p class="text-md">{{ hourIndex.temp.toFixed() }}<span v-html="degreeSymbol"></span></p>
        <p class="text-xs text-blue-500">{{ getPrecip(hourIndex) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import fromUnixTime from 'date-fns/fromUnixTime';
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
  computed: {
    updateTemp: function () {
      return this.$store.getters.openWeatherForecast.hourly.temp.toFixed();
    },
  },
  methods: {
    getHour(x) {
      return format(new Date(fromUnixTime(x)), 'ha').toLowerCase();
    },
    getDate(x) {
      if (format(new Date(fromUnixTime(x)), 'H').toLowerCase() == 0) {
        return format(new Date(fromUnixTime(x)), 'do');
      }
    },
    getPrecip(x){
      if (x.rain){
        return (x.rain['1h']/25.4).toFixed(2)
      }
    }
  },
};
</script>

<style></style>
