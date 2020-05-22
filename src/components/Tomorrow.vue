<template>
  <div>
    <h2 class="flex items-end mb-2 text-2xl font-medium">
      Tomorrow
    </h2>
    <div class="flex">
      <!-- Weather icon -->
      <weather-icon
        v-if="isLoaded"
        :isLoaded="isLoaded"
        :narrative="updateNarrative"
        :isNight="''"
        class="h-10 self-center"
      ></weather-icon>
      <!-- Temps and narrative -->
      <div class="ml-2">
        <div class="flex items-end pb-2 space-x-2">
          <p class="text-lg">{{ updateHighTemp }}<span v-html="degreeSymbol"></span></p>
          <p class="pb-px text-sm font-light">{{ updateLowTemp }}<span v-html="degreeSymbol"></span></p>
        </div>
        <p class="text-md">
          {{ updateNarrative }}
        </p>
      </div>
      <!-- Other info -->
      <div class="ml-8">
        <p class="text-sm">
          Wind:
          <span class="font-light">
            {{ updateWind }}
            mph
          </span>
        </p>
        <p class="text-sm">
          Humidity:
          <span class="font-light"> {{ updateHumidity }}% </span>
        </p>
        <p class="text-sm">
          Visibility:
          <span class="font-light">
            {{ updateVisibility }}
            mi
          </span>
        </p>
      </div>
    </div>
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
      temps: {
        currentTemp: '',
        highTemp: '',
        lowTemp: '',
      },
      format,
      isCelcius: false,
      degreeSymbol: '&#176',
      isLoaded: false,
    };
  },
  computed: {
    updateHighTemp() {
      return this.$store.getters.dailyForecast[1].temp[1].max.value.toFixed();
    },
    updateLowTemp() {
      return this.$store.getters.dailyForecast[1].temp[0].min.value.toFixed();
    },
    updateNarrative() {
      let str = this.$store.getters.dailyForecast[1].weather_code.value.replace(/_/g, ' ');
      if (str.includes('light') || str.includes('heavy')) {
        str = str.split(' ');
        let word = str[str.length-1];
        str.splice(-1, 1)
        str.splice(0, 0, word);
        str = str.join(' ');
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    updateWind() {
      const data = this.$store.getters.dailyForecast[1].wind_speed;
      let wind = '';
      if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
        wind = data[0].humidity[1].max.value.toFixed();
      } else {
        wind = data[0].min.value.toFixed() + '-' + data[1].max.value.toFixed();
      }
      return wind;
    },
    updateHumidity() {
      const data = this.$store.getters.dailyForecast[1].humidity;
      let humidity = '';
      if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
        humidity = data[0].humidity[1].max.value.toFixed();
      } else {
        humidity = data[0].min.value.toFixed() + '-' + data[1].max.value.toFixed();
      }
      return humidity;
    },
    updateVisibility() {
      const data = this.$store.getters.dailyForecast[1].visibility;
      let visibility = '';
      if (data[0].min.value.toFixed() == data[1].max.value.toFixed()) {
        visibility = data[1].max.value.toFixed();
      } else {
        visibility = data[0].min.value.toFixed() + '-' + data[1].max.value.toFixed();
      }
      return visibility;
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
