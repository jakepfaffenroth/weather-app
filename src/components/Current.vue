<template>
  <div>
    <h1 class="text-xl">Today's conditions</h1>
    <div class="flex justify-center space-x-6">
      <div>
        <h3 class="text-sm">Current:</h3>
        <p v-html="temps.currentTemp + ' ' + unitsTemp"></p>
      </div>
      <div>
        <h3 class="text-sm">High:</h3>
        <p v-html="temps.highTemp + ' ' + unitsTemp"></p>
      </div>
      <div>
        <h3 class="text-sm">Low:</h3>
        <p v-html="temps.lowTemp + ' ' + unitsTemp"></p>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
// import EventBus from '../main.js';

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

      isCelcius: false,
      unitsTemp: '',
    };
  },
  created() {
    this.temps.currentTemp = this.rawForecastData.temperature.values[0].value;
    this.temps.highTemp = this.rawForecastData.maxTemperature.values[0].value;
    this.temps.lowTemp = this.rawForecastData.minTemperature.values[0].value;

    for (var key in this.temps) {
      if (!this.isCelcius) {
        this.temps[key] = this.temps[key] * 1.8 + 32;
        this.unitsTemp = '&#8457';
        /**/ console.log(key, this.temps[key]);
      }
      this.temps[key] = this.temps[key].toFixed();
    }
  },
};
</script>
