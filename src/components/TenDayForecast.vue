<template>
  <div class="mb-16">
    <h2 class="text-2xl font-medium">What's Ahead</h2>
    <div id="ten-day-scroller" class="flex flex-no-wrap space-x-10 ml-2 overflow-x-auto scrolling-touch">
      <div
        class="text-center"
        v-for="dayIndex in this.$store.getters.dailyForecast.forecasts"
        :key="dayIndex.myId"
      >
        <h3 class="text-lg">{{ dayIndex.dow }}</h3>
        <p class="mb-2 text-xs text-gray-700">{{ getDate(dayIndex.sunrise) }}</p>
        <p>{{ dayIndex.max_temp }}<span v-html="degreeSymbol"></span></p>
        <p class="text-sm mb-2 text-gray-700">{{ dayIndex.min_temp }}<span v-html="degreeSymbol"></span></p>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';

export default {
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
    };
  },
  methods: {
    getDate(x) {
      return format(new Date(x), 'do');
    },
    // skipTodayInDailyForecast() {
    //   const days = this.$store.getters.dailyForecast.forecasts;
    //   return days.filter(function (day) {
    //     return day.myId > 0;
    //   });
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
};
</script>

<style scoped>
.gradientR {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 98%, rgba(0, 0, 0, 0.6050670640834575) 100%);
}
</style>
