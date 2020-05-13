<template>
  <div>
    <h2>Today's forecast</h2>
    <div>
      <p>{{ location }}</p>
      <div>
        <h4>{{ forecastObj[0].name }}</h4>
        <p>{{ forecastObj[0].detailedForecast }}</p>
      </div>
      <div>
        <h4>{{ forecastObj[1].name }}</h4>
        <p>{{ forecastObj[1].detailedForecast }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    location: String,
    forecastURL: String,
    forecastObj: Array,
    // forecastName: String,
    // forecastSummary: String,
  },
  data() {
    return {
      // forecastObj: [],
      // forecastName: '',
      // forecastSummary: '',
    };
  },
  beforeCreated() {},
};
</script>
