<template>
  <div>
    <h1 class="mb-2 text-2xl font-medium">Tomorrow</h1>
    <div class="flex items-end pb-2 ml-2 space-x-2 font-light">
      <p class="text-lg">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
      <p class="pb-px text-sm">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
    </div>
    <div class="flex mb-6 ml-2 space-x-6">
      <!-- <div>
        <p class="text-md">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
        <p class="text-sm">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
      </div> -->
      <!-- <div class="flex items-center"> -->
        <!-- <h3 class="text-xl">Current:</h3> -->
        <!-- <p class="text-md">
          {{ updateNarrative }}
        </p> -->
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
      let str = this.$store.getters.dailyForecast[0].weather_code.value.replace('_', ' ');
      return str.charAt(0).toUpperCase() + str.slice(1)
      
    },
    updateHighTemp() {
      return this.$store.getters.openWeatherForecast.daily[1].temp.max.toFixed();
    },
    updateLowTemp() {
      return this.$store.getters.openWeatherForecast.daily[1].temp.min.toFixed();
    },
  },
  created() {
    // this.temps.highTemp = this.$store.getters.dailyForecast[0].temp[1].max.value.toFixed();

    // this.temps.lowTemp = this.$store.getters.dailyForecast[0].temp[0].min.value.toFixed();

    // let time = format(new Date(this.$store.getters.currentForecast.validTimeLocal), 'h:mm a  yyyy-MM-dd');

    // /**/ console.log('Forecast updated: ' + time);

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
