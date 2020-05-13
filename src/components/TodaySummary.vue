<template>
  <div>
    <h2 class="text-xl">Detailed forecast</h2>
    <div class="grid sm:grid-cols-3 gap-4 p-8 lg:px-16">
      <div>
        <h3 class="font-medium">{{ forecastObj[0].name }}</h3>
        <p>{{ forecastObj[0].detailedForecast }}</p>
      </div>
      <div>
        <h3 class="font-medium">{{ forecastObj[1].name }}</h3>
        <p>{{ forecastObj[1].detailedForecast }}</p>
      </div>
      <!-- Third period -->
      <div>
        <h3 class="font-medium">{{ forecastObj[2].name }}</h3>
        <p>{{ forecastObj[2].detailedForecast }}</p>
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
