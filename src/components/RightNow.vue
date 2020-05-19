<template>
  <div>
    <h2 class="text-2xl font-medium">Right Now</h2>
    <div class="flex text-lg items-end ml-2">
      <p class="pb-px text-xl">{{ this.temp }}<span v-html="degreeSymbol"></span></p>
      <p class="ml-4 pb-px font-thin">Feels like</p>
      <p class="ml-2 font-light pb-px">{{ feelsLike }}<span v-html="degreeSymbol"></span></p>
    </div>
    <div class="flex ml-2 space-x-6">
      <p class="text-md">
        {{ narrative }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp: '',
      feelsLike: '',
      narrative:'',
      degreeSymbol: '&#176',
    };
  },
  methods: {
    updateTemp() {
      // this.temp = this.$store.getters.realtimeForecast.temp.value.toFixed();
    },
    updateFeelsLike: function () {
      this.feelsLike = this.$store.getters.realtimeForecast.feels_like.value.toFixed();
    },
    updateNarrative() {
      let str = this.$store.getters.realtimeForecast.weather_code.value.replace('_', ' ');
      this.narrative = str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  async created() {
      this.temp = await this.$store.getters.realtimeForecast.temp.value.toFixed();
    this.updateFeelsLike();
    this.updateNarrative();
  },
};
</script>

<style></style>
