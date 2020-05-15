<template>
  <div>
    <h1 class="text-xl">Today's conditions</h1>
    <div class="flex justify-center space-x-6">
      <div>
        <h3 class="text-sm">Current:</h3>
        <p v-html="this.$store.getters.currentForecast.temperature + ' ' + unitsTemp"></p>
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
import format from 'date-fns/format';
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
      format,
      isCelcius: false,
      unitsTemp: '&#8457',
    };
  },
  created() {
    this.temps.currentTemp = this.$store.getters.currentForecast.temperature;
    this.temps.highTemp = this.$store.getters.currentForecast.temperatureMaxSince7Am;
    this.temps.lowTemp = this.$store.getters.currentForecast.temperatureMin24Hour;

    let time = format(new Date(this.$store.getters.currentForecast.validTimeLocal), 'h:mm a  yyyy-MM-dd');

    /**/ console.log('Forecast updated: ' + time);

    for (var key in this.temps) {
      if (this.isCelcius) {
        this.temps[key] = this.temps[key] * 1.8 + 32;
        this.unitsTemp = 'C';
      }
      this.temps[key] = this.temps[key].toFixed();
    }
  },
};
</script>
