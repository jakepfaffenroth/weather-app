// TODO - Store location history in local storage

<template>
  <div class="sm:mt-2">
    <!-- button -->
    <div class="flex">
      <!-- button -->
      <button
        @click="showSearchForm"
        class="sm:m-1 sm:py-1 px-3 bg-transparent sm:hover:bg-blue-400 sm:hover:text-white sm:border sm:border-blue-500 sm:hover:border-transparent sm:hover:shadow sm:text-black text-blue-600 text-sm rounded"
      >
        <span class="hidden sm:block">Search locations</span>
        <span class="sm:hidden">Search</span>
      </button>
        <!-- Refresh button - mobile only-->
      <button
        @click="reload()"
        class="sm:m-1 sm:py-1 px-3 bg-transparent sm:hover:bg-blue-400 sm:hover:text-white sm:border sm:border-blue-500 sm:hover:border-transparent sm:hover:shadow sm:text-black text-blue-600 text-sm rounded block sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-refresh-cw"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      </button>
        <!-- Geolocation button - desktop only -->
      <button
        @click="$emit('get-forecast')"
        class="sm:m-1 sm:py-1 px-3 bg-transparent sm:hover:bg-blue-400 sm:hover:text-white sm:border sm:border-blue-500 sm:hover:border-transparent sm:hover:shadow sm:text-black text-blue-600 text-sm rounded hidden sm:block"
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
      </button>
    </div>

    <!-- Search Modal -->
    <search-modal
      :visible="visible"
      v-on:hide-search-form="hideSearchForm"
      v-on:update-display="updateDisplay"
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
    reload(){
      location.reload()
    },
    updateDisplay(data) {
      this.$emit('update-display', data);
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
