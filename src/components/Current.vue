<template>
  <div>
    <h1 class="text-2xl mb-2">Today</h1>
    <div class="flex justify-center space-x-6 w-32 mx-auto mb-6">
      <div class="flex items-center">
        <!-- <h3 class="text-xl">Current:</h3> -->
        <p class="text-2xl">{{ updateTemp }}<span v-html="degreeSymbol"></span></p>
      </div>
      <div>
        <!-- <div class='inline-block'></div> -->
        <!-- <h3 class="text-sm">High:</h3> -->
        <p class='text-md'>{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
        <p class="text-sm">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
export default {
  props: {
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
      return this.$store.getters.currentForecast.temperature;
    },
    updateHighTemp() {
      return this.$store.getters.currentForecast.temperatureMaxSince7Am;
    },
    updateLowTemp() {
      return this.$store.getters.currentForecast.temperatureMin24Hour;
    },
  },
  created() {
    this.temps.currentTemp = this.$store.getters.currentForecast.temperature;
    this.temps.highTemp = this.$store.getters.currentForecast.temperatureMaxSince7Am;
    this.temps.lowTemp = this.$store.getters.currentForecast.temperatureMin24Hour;

    let time = format(new Date(this.$store.getters.currentForecast.validTimeLocal), 'h:mm a  yyyy-MM-dd');

    /**/ console.log('Forecast updated: ' + time);

    for (var key in this.temps) {
      if (this.isCelcius) {
        this.temps[key] = this.temps[key] * 1.8 + 32;
        this.degreeSymbol = 'C';
      }
      this.temps[key] = this.temps[key].toFixed();
    }
  },
};
</script>
