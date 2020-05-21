<template>
  <div>
    <!-- Display Forecast -->
    <div class="sm:grid sm:grid-cols-2 sm:gap-16 space-y">
        <today></today>
        <tomorrow class='mt-4 sm:mt-0'></tomorrow>
    </div>

    <hourly class='sm:mt-6 mt-4'> </hourly>
  </div>
</template>

<script>
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
    Hourly,
    Today,
    Tomorrow,
  },
};
</script>
