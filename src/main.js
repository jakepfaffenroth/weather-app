import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import VueResource from 'vue-resource';
// @ts-ignore
import VueGeolocation from 'vue-browser-geolocation';

import './assets/styles.css';

// @ts-ignore
Vue.use(VueResource);
// @ts-ignore
Vue.use(VueGeolocation);

Vue.http.options.root = 'https://api.weather.gov/';

Vue.config.productionTip = false;

// @ts-ignore
export const EventBus = new Vue();

// @ts-ignore
new Vue({
  // created() {
  //   const customActions = {
  //     getForecast: { method: 'GET', url: this.forecastURL },
  //   };
  //   this.resource = this.$resource('{node}.json', {}, customActions);
  // },
  render: (h) => h(App),
}).$mount('#app');
