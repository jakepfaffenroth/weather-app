<template>
  <div>
    <div class="flex items-end mb-2 space-x-6">
      <h2 class="flex items-end text-2xl font-medium">
        Today
        <!-- <p class="ml-4 pb-px text-xl font-thin">Feels like</p>
        <p class="ml-2 text-xl font-light pb-px">{{ updateTemp }}<span v-html="degreeSymbol"></span></p> -->
      </h2>
    </div>
    <div class="flex items-end pb-2 ml-2 space-x-2 font-light">
      <p class="text-lg">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
      <p class="pb-px text-sm">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
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
  data() {
    return {
      realtimeForecast: {},
      dailyForecast: {},
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
      return this.$store.getters.realtimeForecast.feels_like.value.toFixed();
    },
    updateHighTemp() {
      return this.$store.getters.dailyForecast[0].temp[1].max.value.toFixed();
    },
    updateLowTemp() {
      return this.$store.getters.dailyForecast[0].temp[0].min.value.toFixed();
    },

    updateNarrative() {
      let str = this.$store.getters.dailyForecast[0].weather_code.value.replace('_', ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
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
