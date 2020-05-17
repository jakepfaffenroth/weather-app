// TODO - Store location history in local storage

<template>
  <div class="flex justify-end self-end mt-6">
    <!-- button -->
    <div class="flex">
      <!-- button -->
      <button
        @click="showSearchForm"
        class="m-1 bg-transparent hover:bg-blue-400 hover:text-white border border-blue-500 hover:border-transparent hover:shadow text-black text-sm py-2 px-3 rounded"
      >
        Search locations
      </button>
      <button
        @click="$emit('get-forecast')"
        class="m-1 bg-transparent hover:bg-blue-400 hover:text-white border border-blue-500 hover:border-transparent hover:shadow text-black text-sm py-2 px-3 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-navigation"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
        </svg>
        <!-- <img src="../assets/location-icon.png" class="h-4" /> -->
      </button>
    </div>

    <!-- Search Modal -->
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
    },
    hideSearchForm() {
      this.visible = false;
    },
  },
  components: {
    SearchModal,
  },
};
</script>

<style></style>
