import Vue from 'vue';
// import store from './store';
// @ts-ignore
import App from './App.vue';
import VueResource from 'vue-resource';
// @ts-ignore
import VueGeolocation from 'vue-browser-geolocation';
// import GoogleMapsLoader from 'google-maps'

// import format from 'date-fns/format';

import './assets/styles.css';

// @ts-ignore
Vue.use(VueResource);
// @ts-ignore
Vue.use(VueGeolocation);
// Vue.use(format);

// Vue.http.options.root = 'https://api.weather.gov/';

Vue.config.productionTip = false;

// @ts-ignore
// export const EventBus = new Vue();

// @ts-ignore
new Vue({
  render: (h) => h(App),
}).$mount('#app');

window.Event = new Vue();

