<template>
  <div>
    <p class="text-sm italic">Details (wind, UV, etc.) here</p>
  </div>
</template>

<script>
export default {
  props: {
    rawForecastData: Object,
  },
  data() {
    return {
      temps: {
        currentTemp: '',
      },

      isCelcius: false,
      unitsTemp: '',
    };
  },
  created() {
    // this.temps.currentTemp = this.rawForecastData.temperature.values[0].value;

    for (var key in this.temps) {
      if (!this.isCelcius) {
        this.temps[key] = this.temps[key] * 1.8 + 32;
        this.unitsTemp = '&#8457';
      }
      this.temps[key] = this.temps[key].toFixed();
    }
  },
};
</script>

<style></style>
