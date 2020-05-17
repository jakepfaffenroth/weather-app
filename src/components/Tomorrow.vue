<template>
  <div>
    <h1 class="mb-2 text-2xl font-medium">Tomorrow</h1>
    <div class="flex items-end pb-2 ml-2 space-x-2 ">
      <p class="text-lg">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
      <p class="text-sm">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
    </div>
    <div class="flex mb-6 ml-2 space-x-6">
      <!-- <div>
        <p class="text-md">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
        <p class="text-sm">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
      </div> -->
      <!-- <div class="flex items-center"> -->
        <!-- <h3 class="text-xl">Current:</h3> -->
        <p class="text-md">
          {{ updateNarrative }}
        </p>
      <!-- </div> -->
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
    updateNarrative: function () {
      return this.$store.getters.dailyForecast.forecasts[0].day.narrative;
    },
    updateHighTemp() {
      return this.$store.getters.dailyForecast.forecasts[0].max_temp;
    },
    updateLowTemp() {
      return this.$store.getters.dailyForecast.forecasts[0].min_temp;
    },
  },
  created() {
    this.temps.highTemp = this.$store.getters.dailyForecast.forecasts[0].max_temp;

    this.temps.lowTemp = this.$store.getters.dailyForecast.forecasts[0].min_temp;

    let time = format(new Date(this.$store.getters.currentForecast.validTimeLocal), 'h:mm a  yyyy-MM-dd');

    /**/ console.log('Forecast updated: ' + time);

    for (var key in this.temps) {
      if (this.isCelcius) {
        this.temps[key] = (5/9*(this.temps[key]-32)).toFixed();
        this.degreeSymbol = 'C';
      }
      // this.temps[key] = this.temps[key].toFixed();
    }
  },
};
</script>
