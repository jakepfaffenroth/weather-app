import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import VueResource from 'vue-resource';

// @ts-ignore
Vue.use(VueResource);

Vue.http.options.root = 'https://api.weather.gov/';

Vue.config.productionTip = false;

new Vue({
  // created() {
  //   const customActions = {
  //     getForecast: { method: 'GET', url: this.forecastURL },
  //   };
  //   this.resource = this.$resource('{node}.json', {}, customActions);
  // },
  render: (h) => h(App),
}).$mount('#app');
