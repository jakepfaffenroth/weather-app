<template>
  <div>
    <h2 class="flex items-end mb-2 text-2xl font-medium">
      Today
    </h2>
    <div class="flex">
      <weather-icon
        v-if="isLoaded"
        :isLoaded="isLoaded"
        :narrative="updateNarrative"
        :isNight="isNight"
        class="h-10 self-center"
      ></weather-icon>
      <div class="ml-2">
        <div class="flex items-end pb-2 space-x-2">
          <p class="text-lg">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
          <p class="pb-px text-sm font-light">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
        </div>
        <p class="text-md">
          {{ updateNarrative }}
        </p>
      </div>
      <div class="ml-8">
        <p class="text-sm">
          Wind:
          <span class="font-light">
            {{ this.$store.getters.dailyForecast[0].wind_speed[0].min.value.toFixed() }}-{{
              this.$store.getters.dailyForecast[0].wind_speed[1].max.value.toFixed()
            }}
            mph
          </span>
        </p>
        <p class="text-sm">
          Humidity:
          <span class="font-light">
            {{ this.$store.getters.dailyForecast[0].humidity[0].min.value.toFixed() }}-{{
              this.$store.getters.dailyForecast[0].humidity[1].max.value.toFixed()
            }}%
          </span>
        </p>
        <p class="text-sm">
          Visibility:
          <span class="font-light">
            {{ this.$store.getters.dailyForecast[0].visibility[0].min.value.toFixed() }}-{{
              this.$store.getters.dailyForecast[0].visibility[1].max.value.toFixed()
            }}
            mi
          </span>
        </p>
      </div>
    </div>
    <div class="flex mb-6 ml-2 space-x-6"></div>
  </div>
</template>

<script>
import format from 'date-fns/format';
import WeatherIcon from './WeatherIcon.vue';
export default {
  components: {
    WeatherIcon,
  },
  data() {
    return {
      realtimeForecast: {},
      dailyForecast: {},
      temps: {
        currentTemp: '',
        highTemp: '',
        lowTemp: '',
      },
      narrative:'',
      format,
      isCelcius: false,
      degreeSymbol: '&#176',
      isLoaded: false,
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
    isNight() {
      // Display night version of icon if after 7pm
      return Number(format(new Date(), 'H')) >= 19 ? 'nt_' : '';
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
  mounted() {
    this.isLoaded = true;
  },
};
</script>
