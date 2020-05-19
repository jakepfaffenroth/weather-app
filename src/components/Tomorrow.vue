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
      let str = this.$store.getters.dailyForecast[1].weather_code.value.replace('_', ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    updateHighTemp() {
      return this.$store.getters.dailyForecast[1].temp[1].max.value.toFixed();
    },
    updateLowTemp() {
      return this.$store.getters.dailyForecast[1].temp[0].min.value.toFixed();
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
