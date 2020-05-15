<template>
  <div>
    <h2 class="text-2xl">What's Ahead</h2>
    <div class="flex flex-no-wrap overflow-x-auto">
      <div class="p-6" v-for="dayIndex in skipTodayInDailyForecast" :key="dayIndex.myId">
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
  computed: {
    skipTodayInDailyForecast: function() {
      const days = this.$store.getters.dailyForecast.forecasts;
      return days.filter(function (day) {
        return day.myId > 0;
      });
    },
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

<style></style>
