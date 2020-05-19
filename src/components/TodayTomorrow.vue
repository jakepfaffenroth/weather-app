<template>
  <div>
    <!-- Display Forecast -->
    <div class="md:grid md:grid-cols-2 md:gap-16">
      <div>
        <today></today>
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
import Today from './Today.vue';
import Tomorrow from './Tomorrow.vue';

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
    Today,
    Tomorrow,
  },
};
</script>
