import Vue from 'vue';
import {store} from './store/store';
// @ts-ignore
import App from './App.vue';
import VueResource from 'vue-resource';
// @ts-ignore
import VueGeolocation from 'vue-browser-geolocation';
import { VueScrollIndicator } from 'vue-scroll-indicator';

import './assets/styles.css';

// @ts-ignore
Vue.use(VueResource);
// @ts-ignore
Vue.use(VueGeolocation);
Vue.use(VueScrollIndicator);

Vue.config.productionTip = false;

// const EventBus = new Vue() 

// @ts-ignore
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

// @ts-ignore
window.Event = new Vue();

