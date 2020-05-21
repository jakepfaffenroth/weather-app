<template>
  <img v-if="isLoaded" :src="weatherIcon()" class="sm:h-16 h-24" />
</template>

<script>
export default {
  props: {
    isLoaded: { type: Boolean, required: true },
    narrative: { type: String, required: true },
    isNight: { type: String, required: true },
  },
  data() {
    return {
      chanceflurries: require('../assets/icons/chanceflurries.svg'),
      chancerain: require('../assets/icons/chancerain.svg'),
      chancesleet: require('../assets/icons/chancesleet.svg'),
      chancesnow: require('../assets/icons/chancesnow.svg'),
      chancetstorms: require('../assets/icons/chancetstorms.svg'),
      clear: require('../assets/icons/clear.svg'),
      cloudy: require('../assets/icons/cloudy.svg'),
      flurries: require('../assets/icons/flurries.svg'),
      fog: require('../assets/icons/fog.svg'),
      hazy: require('../assets/icons/hazy.svg'),
      mostlycloudy: require('../assets/icons/mostlycloudy.svg'),
      mostlysunny: require('../assets/icons/mostlysunny.svg'),
      partlycloudy: require('../assets/icons/partlycloudy.svg'),
      partlysunny: require('../assets/icons/partlysunny.svg'),
      rain: require('../assets/icons/rain.svg'),
      sleet: require('../assets/icons/sleet.svg'),
      snow: require('../assets/icons/snow.svg'),
      sunny: require('../assets/icons/sunny.svg'),
      tstorms: require('../assets/icons/tstorms.svg'),
      unknown: require('../assets/icons/unknown.svg'),
      nt_chanceflurries: require('../assets/icons/nt_chanceflurries.svg'),
      nt_chancerain: require('../assets/icons/nt_chancerain.svg'),
      nt_chancesleet: require('../assets/icons/nt_chancesleet.svg'),
      nt_chancesnow: require('../assets/icons/nt_chancesnow.svg'),
      nt_chancetstorms: require('../assets/icons/nt_chancetstorms.svg'),
      nt_clear: require('../assets/icons/nt_clear.svg'),
      nt_cloudy: require('../assets/icons/nt_cloudy.svg'),
      nt_flurries: require('../assets/icons/nt_flurries.svg'),
      nt_fog: require('../assets/icons/nt_fog.svg'),
      nt_hazy: require('../assets/icons/nt_hazy.svg'),
      nt_mostlycloudy: require('../assets/icons/nt_mostlycloudy.svg'),
      nt_mostlysunny: require('../assets/icons/nt_mostlysunny.svg'),
      nt_partlycloudy: require('../assets/icons/nt_partlycloudy.svg'),
      nt_partlysunny: require('../assets/icons/nt_partlysunny.svg'),
      nt_rain: require('../assets/icons/nt_rain.svg'),
      nt_sleet: require('../assets/icons/nt_sleet.svg'),
      nt_snow: require('../assets/icons/nt_snow.svg'),
      nt_sunny: require('../assets/icons/nt_sunny.svg'),
      nt_tstorms: require('../assets/icons/nt_tstorms.svg'),
      nt_unknown: require('../assets/icons/nt_unknown.svg'),
    };
  },
  methods: {
    weatherIcon() {
      // Shows question mark weather icon if no other icon is found
      let icon = 'unknown';
      let str = this.narrative.toLowerCase();

      if (str.includes('freezing')) icon = 'sleet';
      if (str.includes('ice')) icon = 'sleet';
      if (str.includes('snow')) icon = 'snow';
      if (str.includes('flurries')) icon = 'flurries';
      if (str.includes('tstorm')) icon = 'tstorms';
      if (str.includes('rain')) icon = 'rain';
      if (str.includes('drizzle')) icon = 'rain';
      if (str.includes('fog')) icon = 'fog';
      if (str.includes('mostly cloudy')) icon = 'mostlycloudy';
      if (str.includes('partly cloudy')) icon = 'partlycloudy';
      if (str.includes('mostly clear')) icon = 'mostlysunny';
      if (str === 'cloudy') icon = 'cloudy';
      if (str === 'clear') icon = 'sunny';
      
      // Assembles path
      return require('../assets/icons/' + this.isNight + icon + '.svg');
    },
  },
};
</script>

<style></style>
