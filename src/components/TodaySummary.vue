<template>
  <div>
    <h2 class="text-xl">Detailed forecast</h2>
    <div class="grid sm:grid-cols-3 gap-4 p-8 lg:px-16">
      <div>
        <h3 class="font-medium">{{ this.$store.getters.intradayForecast.forecasts[0].daypart_name }}</h3>
        <p>{{ this.$store.getters.intradayForecast.forecasts[0].temp }}</p>
        <br>
        <p class='text-sm'>{{ this.$store.getters.intradayForecast.forecasts[0].phrase_32char }}</p>
      </div>
      <div>
        <h3 class="font-medium">{{ this.$store.getters.intradayForecast.forecasts[1].daypart_name }}</h3>
        <p>{{ this.$store.getters.intradayForecast.forecasts[1].temp }}</p>
        <br>
        <p class='text-sm'>{{ this.$store.getters.intradayForecast.forecasts[1].phrase_32char }}</p>
      </div>
      <div>
        <h3 class="font-medium">{{ this.$store.getters.intradayForecast.forecasts[2].daypart_name }}</h3>
        <p>{{ this.$store.getters.intradayForecast.forecasts[2].temp }}</p>
        <br>
        <p class='text-sm'>{{ this.$store.getters.intradayForecast.forecasts[2].phrase_32char }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forecastObj: Array,
  },
};
</script>

<style></style>
