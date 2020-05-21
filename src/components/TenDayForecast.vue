<template>
  <div class="mb-16">
    <h2 class="text-2xl font-medium">What's Ahead</h2>
    <div id="ten-day-scroller" class="mb-4 overflow-x-auto scrolling-touch">
      <div class="flex space-x-10 mb-4">
        <div class="text-center" v-for="dayIndex in this.$store.getters.dailyForecast" :key="dayIndex.myId">
          <h3 class="text-lg">{{ getDayName(dayIndex.date) }}</h3>
          <!-- Weather icons -->
          <weather-icon
            v-if="isLoaded"
            :isLoaded="isLoaded"
            :narrative="updateNarrative(dayIndex)"
            :isNight="isNight(dayIndex)"
            class="h-8 mx-auto"
          ></weather-icon>
          <p class="mb-2 text-xs font-light">{{ getDate(dayIndex.date) }}</p>
          <div class="flex items-end pb-2 space-x-2">
            <p class="text-md">{{ dayIndex.temp[1].max.value.toFixed() }}<span v-html="degreeSymbol"></span></p>
            <p class="pb-px text-sm text-gray-700">
              {{ dayIndex.temp[0].min.value.toFixed() }}<span v-html="degreeSymbol"></span>
            </p>
          </div>
          <p class="text-xs text-blue-500">{{ getPrecip(dayIndex) }}</p>
        </div>
      </div>
      <!-- Daily chart -->
      <daily-chart :isDailyLoaded="isDailyLoaded"></daily-chart>
    </div>
  </div>
</template>

<script>
import DailyChart from './DailyChart.vue';
import WeatherIcon from './WeatherIcon.vue';
import format from 'date-fns/format';

export default {
  components: {
    DailyChart,
    WeatherIcon,
  },
  data() {
    return {
      daysObj: {},
      daysData: [],
      days: [
        [
          { dow: 'Friday', temp: '60' },
          { dow: 'Saturday', temp: '64' },
        ],
      ],
      degreeSymbol: '&#176',
      isDailyLoaded: false,
      isLoaded: false,
    };
  },
  methods: {
    getDayName(x) {
      return format(new Date(x), 'E');
    },
    getDate(x) {
      return format(new Date(x), 'do');
    },
    getPrecip(x) {
      if (x.precipitation[0].max.value > 0 && x.precipitation[0].max.value < 0.005) {
        return '<0.01 in';
      } else if (x.precipitation[0].max.value > 0) {
        return x.precipitation[0].max.value.toFixed(2) + ' in';
      }
    },
    updateNarrative(dayIndex) {
      let str = dayIndex.weather_code.value.replace('_', ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    isNight(dayIndex) {
      // Display night version of icon before sunrise and after sunset
      const time = dayIndex.observation_time.value;
      const sunrise = format(new Date(dayIndex.sunrise.value), 'H');
      const sunset = format(new Date(dayIndex.sunset.value), 'H');
      return Number(format(new Date(time), 'H')) <= sunrise || Number(format(new Date(time), 'H')) >= sunset
        ? 'nt_'
        : '';
    },
    // getPrecipProbability(x) {
    //   if (x.precipitation_probability.value > 0) {
    //     return x.precipitation_probability.value + '%';
    //   }
    // },
    // getPrecipVolume(x) {
    //   if (x.precipitation_probability.value > 0 && x.precipitation.value < 0.01) {
    //     return '<0.01';
    //   } else if (x.precipitation_probability.value > 0 && x.precipitation.value > 0) {
    //     return x.precipitation.value.toFixed(2);
    //   }
    // },
  },
  created() {
    // this.daysData = this.$store.getters.dailyForecast.forecasts;
    // /**/ console.log(this.daysData);
    // for (let index = 0; index < this.daysData.length; index++) {
    //   this.daysData[index].myId = index;
    // const object = Object.entries(dayObj);
    // object.forEach((key) => {
    //   console.log(key);
    // });
    // }
    // this.daysData.forEach((index) => {
    //   /**/ console.log(this.daysData);
    //   const object = Object.entries(index);
    //   object.forEach((key) => {
    //     this.days[index] = key;
    // });
    //   // console.log(key);
    // });
  },
  mounted() {
    this.isDailyLoaded = true;
    this.isLoaded = true;
  },
};
</script>

<style></style>
