<template>
  <!-- Search modal -->
  <div v-show="visible">
    <div
      id="modalOverlay"
      @click="$emit('hide-search-form')"
      class="fixed block left-0 right-0 bottom-0 top-0 h-screen w-screen bg-black bg-opacity-50"
    ></div>
    <div id="searchForm" class="w-full max-w-md fixed left-0 right-0 mt-30 m-auto shadow-md">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            v-model="searchInput"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Bellingham, WA"
            aria-label="Search"
          />
          <button
            @click="search"
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Search
          </button>
          <button
            @click="$emit('hide-search-form')"
            class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { gmapApi } from 'vue2-google-maps';

export default {
  props: ['visible'],
  data() {
    return {
      searchInput: '',
    };
  },
  methods: {
    // close() {
    //   this.visible = false;
    //   this.$emit(this.visible);
    // },

    search() {
      //   // var service = new google.maps.places.PlacesService();
      //   gmapApi.findPlaceFromQuery(this.searchInput, function (results, status) {
      //     if (status === google.maps.places.PlacesServiceStatus.OK) {
      //       for (var i = 0; i < results.length; i++) {
      //         /**/ console.log(results[i]);
      //       }
      //       /**/ console.log(results[0]);
    },
    //   });

    // fetch(
    //   'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' +
    //     this.searchInput +
    //     '&inputtype=textquery&key=AIzaSyDZ12-Jzb1NAtzGdWVDkRmBZOVBy1wJff4',
    //   { mode: 'cors' }
    // ).then((response) => {
    //   /**/ console.log(this.searchInput);
    //   /**/ console.log(response);
    // });
    // },
  },
  // computed: {
  //   google: gmapApi,
  // },
};
</script>

<style></style>
