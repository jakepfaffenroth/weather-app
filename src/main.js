import Vue from 'vue';
import { store } from './store/store';
// @ts-ignore
import App from './App.vue';
import VueResource from 'vue-resource';
// @ts-ignore
import VueGeolocation from 'vue-browser-geolocation';

import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Spinner from 'vue-spinkit'
// import SvgIcon from 'vue-svgicon';

import './assets/styles.css';

Vue.use(ChartDataLabels)
Vue.use(Chartkick.use(Chart));
// @ts-ignore
Vue.use(VueResource);
// @ts-ignore
Vue.use(VueGeolocation);
// Vue.use(SvgIcon, {
//   tagName: 'icon',
// });

Vue.config.productionTip = false;


// @ts-ignore
new Vue({
  store,
  Spinner,
  render: (h) => h(App),
}).$mount('#app');

// @ts-ignore
window.Event = new Vue();
