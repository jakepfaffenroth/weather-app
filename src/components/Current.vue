<template>
  <div>
    <div class="flex items-end mb-2 space-x-6">
      <h1 class="flex items-end text-2xl font-medium">
        Today
        <p class="ml-4 pb-px text-xl font-thin">Feels like</p>
        <p class="ml-2 text-xl font-light pb-px">{{ updateTemp }}<span v-html="degreeSymbol"></span></p>
      </h1>
    </div>
    <div class="flex items-end pb-2 ml-2 space-x-2 font-light">
      <p class="text-lg">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
      <p class="text-sm">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
    </div>
    <div class="flex mb-6 ml-2 space-x-6">
      <p class="text-md">
        {{ updateNarrative }}
      </p>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
export default {
  props: {
    todayData: Object,
    rawForecastData: Object,
  },
  data() {
    return {
      temps: {
        currentTemp: '',
        highTemp: '',
        lowTemp: '',
      },
      format,
      isCelcius: false,
      degreeSymbol: '&#176',
    };
  },
  computed: {
    updateTemp: function () {
      return this.$store.getters.currentForecast.temp.value.toFixed();
    },
    updateHighTemp() {
      return this.todayData.temp[1].max.value.toFixed();
    },
    updateLowTemp() {
      return this.todayData.temp[0].min.value.toFixed();
    },
    updateNarrative() {
      let str = this.$store.getters.currentForecast.weather_code.value.replace('_', ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  created() {
    this.temps.currentTemp = this.$store.getters.currentForecast.temp.value.toFixed();
    this.temps.highTemp = this.todayData.temp[1].max.value.toFixed();
    this.temps.lowTemp = this.todayData.temp[0].min.value.toFixed();

    // let time = format(new Date(this.$store.getters.currentForecast.validTimeLocal), 'h:mm a  yyyy-MM-dd');

    // /**/ console.log('Forecast updated: ' + time);

    for (var key in this.temps) {
      if (this.isCelcius) {
        this.temps[key] = ((5 / 9) * (this.temps[key] - 32)).toFixed();
        this.degreeSymbol = 'C';
      }
      // this.temps[key] = this.temps[key].toFixed();
    }
  },
};
</script>
