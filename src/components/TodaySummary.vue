<template>
  <div>
    <!-- <h2 class="text-xl">Detailed forecast</h2> -->
    <div class="flex sm:grid-cols-3 gap-4 p-8 lg:px-16 text-center justify-between">
      <div>
        <h3 class="text-lg">{{ this.$store.getters.intradayForecast.forecasts[0].daypart_name }}</h3>
        <p class="mb-4">
          {{ this.$store.getters.intradayForecast.forecasts[0].temp }}<span v-html="degreeSymbol"></span>
        </p>
        <p class="text-sm">{{ this.$store.getters.intradayForecast.forecasts[0].phrase_32char }}</p>
      </div>
      <div>
        <h3 class="text-lg">{{ this.$store.getters.intradayForecast.forecasts[1].daypart_name }}</h3>
        <p class="mb-4">
          {{ this.$store.getters.intradayForecast.forecasts[1].temp }}<span v-html="degreeSymbol"></span>
        </p>
        <p class="text-sm">{{ this.$store.getters.intradayForecast.forecasts[1].phrase_32char }}</p>
      </div>
      <div>
        <h3 class="text-lg">{{ this.$store.getters.intradayForecast.forecasts[2].daypart_name }}</h3>
        <p class="mb-4">
          {{ this.$store.getters.intradayForecast.forecasts[2].temp }}<span v-html="degreeSymbol"></span>
        </p>
        <p class="text-sm">{{ this.$store.getters.intradayForecast.forecasts[2].phrase_32char }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forecastObj: Array,
  },
  data() {
    return {
      degreeSymbol: '&#176',
    };
  },
};
</script>

<style></style>
