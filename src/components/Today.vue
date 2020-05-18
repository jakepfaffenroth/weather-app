<template>
  <div>
    <!-- Display Forecast -->
    <div class="md:grid md:grid-cols-2 md:gap-16">
      <div>
        <current></current>
      </div>
      <div>
        <tomorrow></tomorrow>
      </div>
    </div>

    <today-numerical></today-numerical>
    <hourly> </hourly>
  </div>
</template>

<script>
import TodayNumerical from './TodayNumerical.vue';
import Hourly from './Hourly.vue';
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
    Hourly,
    Current,
    Tomorrow,
  },
};
</script>
