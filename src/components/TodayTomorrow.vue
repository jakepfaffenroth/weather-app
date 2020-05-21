<template>
  <div>
    <!-- Display Forecast -->
    <div class="sm:grid sm:grid-cols-2 sm:gap-16">
      <div>
        <today></today>
      </div>
      <div>
        <tomorrow></tomorrow>
      </div>
    </div>

    <hourly> </hourly>
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
