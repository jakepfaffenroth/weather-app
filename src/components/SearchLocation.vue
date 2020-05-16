<template>
  <div class="mt-4">
    <!-- button -->
    <button
      @click="showSearchForm"
      class="bg-blue-400 hover:bg-blue-500 text-white text-sm py-2 px-4 rounded absolute top-0 right-0 m-4"
    >
      Search locations
    </button>
    <search-modal
      :visible="visible"
      v-on:hide-search-form="hideSearchForm"
      v-on:get-current-forecast="getCurrentForecast"
    ></search-modal>
  </div>
</template>

<script>
import SearchModal from './Modal.vue';
export default {
  data() {
    return {
      visible: false,
      retrievedLocation: '',
    };
  },
  methods: {
    getCurrentForecast() {
      this.$emit('get-current-forecast');
    },
    showSearchForm() {
      this.visible = true;
      // this.$emit(this.visible);
    },
    hideSearchForm() {
      this.visible = false;
      // this.$emit(this.visible);
    },
  },
  components: {
    SearchModal,
  },
};
</script>

<style></style>
