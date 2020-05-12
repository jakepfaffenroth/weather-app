<template>
  <div>
    <h2>Today's forecast</h2>
    <div>
      <p>{{ location }}</p>
      <div>
        <h4>{{ forecastName }}</h4>
        <p>{{ forecastSummary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['location', 'forecastObj'],
  data() {
    return {
      forecastName: '',
      forecastSummary: '',
    };
  },
  created() {
    this.forecastName = this.forecastObj.properties.periods[0].name;
    this.forecastSummary = this.forecastObj.properties.periods[0].detailedForecast;
  },
};
</script>
