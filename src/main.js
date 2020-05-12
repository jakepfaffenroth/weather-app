import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import VueResource from 'vue-resource';

// @ts-ignore
Vue.use(VueResource);

Vue.http.options.root = 'https://api.weather.gov/';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
