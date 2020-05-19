import Vue from 'vue';
import { store } from './store/store';
// @ts-ignore
import App from './App.vue';
import VueResource from 'vue-resource';
// @ts-ignore
import VueGeolocation from 'vue-browser-geolocation';

import './assets/styles.css';
import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);
// @ts-ignore
Vue.use(VueResource);
// @ts-ignore
Vue.use(VueGeolocation);
// Vue.use(VueApexCharts);

Vue.config.productionTip = false;

// const EventBus = new Vue()

// @ts-ignore
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

// @ts-ignore
window.Event = new Vue();
