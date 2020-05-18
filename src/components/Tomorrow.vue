<template>
  <div>
    <h1 class="mb-2 text-2xl font-medium">Tomorrow</h1>
    <div class="flex items-end pb-2 ml-2 space-x-2 font-light">
      <p class="text-lg">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
      <p class="pb-px text-sm">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
    </div>
    <div class="flex mb-6 ml-2 space-x-6">
      {{ updateNarrative }}
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
export default {
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
    updateNarrative() {
      return this.$store.getters.currentForecast.properties.periods[1].detailedForecast;
    },
    updateHighTemp() {
      return this.$store.getters.openWeatherForecast.daily[1].temp.max.toFixed();
    },
    updateLowTemp() {
      return this.$store.getters.openWeatherForecast.daily[1].temp.min.toFixed();
    },
  },
  created() {
    for (var key in this.temps) {
      if (this.isCelcius) {
        this.temps[key] = ((5 / 9) * (this.temps[key] - 32)).toFixed();
        this.degreeSymbol = 'C';
      }
    }
  },
};
</script>
