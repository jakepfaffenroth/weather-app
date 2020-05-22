<template>
  <div v-if="isHourlyLoaded">
    <hourly-line-chart
      id="chart"
      class="relative "
      :chart-data="chartData"
      :options="chartOptions"
      :styles="chartStyles"
    ></hourly-line-chart>
  </div>
</template>

<script>
import HourlyLineChart from '../assets/LineChart.js';
import format from 'date-fns/format';

export default {
  props: {
    isHourlyLoaded: Boolean,
  },
  components: {
    HourlyLineChart,
  },
  computed: {
    chartStyles() {
      return {
        position: 'relative',
        display: 'block',
        width: this.getScrollerWidth(),
        height: '200px',
        'z-index': '15',
      };
    },
    chartData() {
      let chartData = {
        labels: [],
        datasets: [
          {
            label: 'Temp',
            yAxisID: 'Temp',
            data: [],
            borderColor: 'RGB(248, 132, 34)',
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 3,
            pointRadius: 0,
          },
          {
            label: 'Precip',
            yAxisID: 'Precip',
            data: [],
            borderColor: '#448dff',
            backgroundColor: '#448dff',
            borderWidth: 0,
            pointRadius: 0,
            datalabels: {
              color: '#4299e1',
              formatter: function (value) {
                return (value*2) + '%';
              },
              display: function (context) {
                return context.dataset.data[context.dataIndex] !== 0;
              },
            },
          },
        ],
      };
      // Starts fetching data from store to populate series
      let hoursArray = this.$store.getters.hourlyForecast;

      // For each hour in the hourlyForecast, determines  the max/min ranges and saves the data to thechartData object
      hoursArray.forEach((hour) => {
        chartData.labels.push(format(new Date(hour.observation_time.value), 'ha'));
        chartData.datasets[0].data.push(hour.temp.value);
        chartData.datasets[1].data.push((hour.precipitation_probability.value)/2);
      });

      return chartData;
    },
    chartOptions() {
      let chartOptions = {
        legend: {
          display: false,
        },
        plugins: {
          datalabels: {
            formatter: function (value) {
              return value.toFixed();
            },
            align: 'end',
            anchor: 'end',
            color: 'RGB(248, 132, 34)',
            font: {
              size: '13',
            },
          },
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'Temp',
              type: 'linear',
              position: 'left',
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
                beginAtZero: false,
                suggestedMax: null,
                suggestedMin: null,
              },
            },
            {
              id: 'Precip',
              type: 'linear',
              position: 'right',
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
                beginAtZero: false,
                suggestedMax: 200,
                suggestedMin: 0,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      };
      // Starts fetching data from store to set Y scale
      let hoursArray = this.$store.getters.hourlyForecast;

      // Sets unrealistic max and min temp ranges so that they will change
      let maxRange = -200;
      let minRange = 200;

      hoursArray.forEach((hour) => {
        if (hour.temp.value > maxRange) {
          maxRange = hour.temp.value;
        }
        if (hour.temp.value < minRange) {
          minRange = hour.temp.value;
        }
      });
      // Adds buffer to y-axis range
      chartOptions.scales.yAxes[0].ticks.suggestedMax = (maxRange + 5).toFixed();
      chartOptions.scales.yAxes[0].ticks.suggestedMin = (minRange - 20).toFixed();

      return chartOptions;
    },
  },
  data() {
    return {
      scrollerWidth: 0,
    };
  },
  mounted() {
    this.getScrollerWidth();
  },
  methods: {
    getScrollerWidth() {
      const scroller = document.getElementById('hourly-scroller');
      return (scroller.scrollWidth) + 'px';
    },

    // getData() {
    //   let hoursArray = this.$store.getters.hourlyForecast;

    //   // Sets unrealistic max and min temp ranges as baselines to be changed dynamically
    //   let maxRange = -200;
    //   let minRange = 200;

    //   // For each hour in the hourlyForecast, determines  the max/min ranges and saves the data to thechartData object
    //   hoursArray.forEach((hour) => {
    //     if (hour.temp.value > maxRange) {
    //       maxRange = hour.temp.value;
    //     }
    //     if (hour.temp.value < minRange) {
    //       minRange = hour.temp.value;
    //     }
    //     this.chartData.labels.push(format(new Date(hour.observation_time.value), 'ha'));
    //     this.chartData.datasets[0].data.push(hour.temp.value);
    //     this.chartData.datasets[1].data.push(hour.precipitation_probability.value);
    //   });
    //   // Adds buffer to y-axis range
    //   this.chartOptions.scales.yAxes[0].ticks.suggestedMax = (maxRange + 3).toFixed();
    //   this.chartOptions.scales.yAxes[0].ticks.suggestedMin = (minRange - 20).toFixed();
    //   return this.chartData;
    // },
  },
};
</script>

<style></style>
