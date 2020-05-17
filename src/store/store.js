import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    retrievedLocationObj: {},
    latLong: '',
    city: '',
    usState: '',
    currentForecast: {},
    intradayForecast: {},
    dailyForecast: {},
    todayDayNarrative: '',
    todayNightNarrative: '',
  },
  mutations: {
    updateLocationObj(state, searchInput) {
      state.retrievedLocationObj = searchInput;
    },
    updateLatLong(state, newLatLong) {
      state.latLong = newLatLong;
    },
    updateCity(state, newCity) {
      state.city = newCity;
    },
    updateUsState(state, newUsState) {
      state.usState = newUsState;
    },
    updateCurrentForecast(state, currentObj) {
      state.currentForecast = currentObj;
    },
    updateIntradayForecast(state, intradayObj) {
      state.intradayForecast = intradayObj;
    },
    updateDailyForecast(state, dailyObj) {
      state.dailyForecast = dailyObj;
    },
    updateTodayDayNarrative(state, todayDayNarrative) {
      state.todayDayNarrative = todayDayNarrative;
    },
    updateTodayNightNarrative(state, todayNightNarrative) {
      state.todayNightNarrative = todayNightNarrative;
    },
  },
  getters: {
    retrievedLocationObj: (state) => state.retrievedLocationObj,
    latLong: (state) => state.latLong,
    city: (state) => state.city,
    usState: (state) => state.usState,
    currentForecast: (state) => state.currentForecast,
    intradayForecast: (state) => state.intradayForecast,
    dailyForecast: (state) => state.dailyForecast,
    todayDayNarrative: (state) => state.todayDayNarrative,
    todayNightNarrative: (state) => state.todayNightNarrative,
  },
});

// const store = new Vuex.Store({
//   state: {
//     retrievedLocationObj: {}
//   },
//   mutations: {
//     updateLocationObj(state, data) {
//       state.retrievedLocationObj = data
//     }
//   }
// })

// export default new Vuex.Store({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
// });
