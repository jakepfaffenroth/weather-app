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
        <div class="flex items-center border-b border-b-2 border-blue-500 py-2">
          <input
            ref="searchBox"
            v-model="searchInput"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Bellingham, WA"
            aria-label="Search"
          />
          <button
            @click="search"
            class="flex-shrink-0 hover:bg-transparent bg-blue-400 text-white border hover:border-blue-500 border-transparent hover:shadow hover:text-blue-700 text-sm py-2 px-3 rounded"
            type="button"
          >
            Search
          </button>
          <button
            @click="$emit('hide-search-form')"
            class="transition flex-shrink-0 border-transparent border-4 text-blue-500 hover:text-blue-700 hover:cursor-pointer text-sm py-1 px-2 rounded"
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
      searchInput: 'Bellingham, WA',
      hereApiKey: '4_VZbS686wPPia11Fqt5kv-fBxOa5iCQ6d3leNFA_s4',
    };
  },
  watch: {
    visible() {
      this.$refs.searchBox.focus();
    },
  },
  methods: {
    search() {
      fetch('https://geocode.search.hereapi.com/v1/geocode?q=' + this.searchInput + '&apiKey=' + this.hereApiKey)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.$store.commit('updateLocationObj', data);
          let locationCoordinatesObj = this.$store.getters.retrievedLocationObj.items[0].position;
          let newLatLong = locationCoordinatesObj.lat.toFixed(2) + ',' + locationCoordinatesObj.lng.toFixed(2);
          // let newCity = data.items[0].address.city;
          // let newState = data.items[0].address.state;
          this.$store.commit('updateLatLong', newLatLong);
          // this.$store.commit('updateCity', newCity);
          // this.$store.commit('updateUsState', newState);
        })
        .then(() => {
          this.reverseGeocode();
        })
        .then(() => {
          this.$emit('get-weather-data');
          this.$emit('hide-search-form');
        });
    },
    reverseGeocode() {
      fetch(
        'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=' +
          this.$store.getters.latLong +
          '%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=' +
          this.hereApiKey
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let city = data.Response.View[0].Result[0].Location.Address.City;
          let state = data.Response.View[0].Result[0].Location.Address.State;

          this.$store.commit('updateCity', city);
          this.$store.commit('updateUsState', state);
        });
    },

    mounted() {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode == 13) {
          this.search();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode == 27) {
          this.close();
        }
      });
    },
    updated() {
      this.$refs.searchBox.focus();
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
