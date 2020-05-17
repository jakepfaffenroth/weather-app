<template>
  <div>
    <!-- Display Forecast -->
    <div class="md:grid md:grid-cols-2 md:gap-16">
      <div class="">
        <current :todayData="todayData"></current>
      </div>
      <div class="">
        <tomorrow></tomorrow>
      </div>
    </div>

    <today-numerical></today-numerical>
    <today-summary> </today-summary>
  </div>
</template>

<script>
import TodayNumerical from './TodayNumerical.vue';
import TodaySummary from './TodaySummary.vue';
import Current from './Current.vue';
import Tomorrow from './Tomorrow.vue';
// import EventBus from '../main.js'

export default {
  props: {
    todayData: Object,
  },
  data() {
    return {};
  },
  components: {
    TodayNumerical,
    TodaySummary,
    Current,
    Tomorrow,
  },
};
</script>
