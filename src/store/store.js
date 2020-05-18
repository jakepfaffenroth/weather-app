import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    retrievedLocationObj: {},
    latLong: '',
    city: '',
    usState: '',
    openWeatherForecast: {},
    currentForecast: {},
    hourlyForecast: {},
    dailyForecast: {},
    todayDayNarrative: {},
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
    updateOpenWeatherForecast(state, data) {
      state.openWeatherForecast = data;
    },
    updateCurrentForecast(state, currentObj) {
      state.currentForecast = currentObj;
    },
    updateHourlyForecast(state, hourlyObj) {
      state.hourlyForecast = hourlyObj;
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
    openWeatherForecast: (state) => state.openWeatherForecast,
    currentForecast: (state) => state.currentForecast,
    hourlyForecast: (state) => state.hourlyForecast,
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
