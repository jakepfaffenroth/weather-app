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
  props: {
    visible: Boolean,
    retrievedLocation: String,
  },
  data() {
    return {
      searchInput: 'Bellingham',
      hereApiKey: '4_VZbS686wPPia11Fqt5kv-fBxOa5iCQ6d3leNFA_s4',
    };
  },
  methods: {
    search() {
      fetch('https://geocode.search.hereapi.com/v1/geocode?q=' + this.searchInput + '&apiKey=' + this.hereApiKey)
        .then((response) => {
          /**/ console.log(response);
          return response.json();
        })
        .then((data) => {
          /**/ console.log(data);
          this.$store.commit('updateLocationObj', data);
          let locationCoordinatesObj = this.$store.getters.retrievedLocationObj.items[0].position;
          let newLatLong = locationCoordinatesObj.lat + ', ' + locationCoordinatesObj.lng;
          this.$store.commit('updateLatLong', newLatLong)
          this.latLong = this.$store.getters.latLong
          
        });
        this.$emit('hide-search-form')
    },
    created() {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode == 27) {
          this.close();
        }
      });
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
