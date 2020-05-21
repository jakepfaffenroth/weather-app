<template>
  <div v-if="isDailyLoaded" class='ml-4'>
    <daily-line-chart
      id="chart"
      class="relative"
      :chart-data="chartData"
      :options="chartOptions"
      :styles="chartStyles"
    ></daily-line-chart>
  </div>
</template>

<script>
import DailyLineChart from '../assets/LineChart.js';
import format from 'date-fns/format';

export default {
  props: {
    isDailyLoaded: Boolean,
  },
  components: {
    DailyLineChart,
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
                if ((value / 1000) > 0 && (value / 1000) < 0.01) {
                  return '<0.01';
                } else if ((value / 1000) >= 0.01) {
                  return (value / 1000).toFixed(2) + ' in';
                }
                return (value / 1000).toFixed(2) + ' in';
              },
              display: function (context) {
                return context.dataset.data[context.dataIndex] !== 0;
              },
            },
          },
        ],
      };
      // Starts fetching data from store to populate series
      let daysArray = this.$store.getters.dailyForecast;

      // For each day in the dailyForecast, determines the max/min ranges and saves the data to the chartData object
      daysArray.forEach((day) => {
        chartData.labels.push(format(new Date(day.observation_time.value), 'do'));
        chartData.datasets[0].data.push(day.temp[1].max.value);
        chartData.datasets[1].data.push(day.precipitation[0].max.value * 1000);
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
              // TODO - Return this back to 'return value.toFixed()'
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
      const daysArray = this.$store.getters.dailyForecast;
      // const value = 'temp[1].max.value';
      // Sets unrealistic max and min temp ranges so that they will change
      let maxRange = -200;
      let minRange = 200;

      daysArray.forEach((day) => {
        if (day.temp[1].max.value > maxRange) {
          maxRange = day.temp[1].max.value;
        }
        if (day.temp[1].max.value < minRange) {
          minRange = day.temp[1].max.value;
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
      const scroller = document.getElementById('ten-day-scroller');
      return (scroller.scrollWidth-30) + 'px';
    },

    // getData() {
    //   let daysArray = this.$store.getters.dailyForecast;
    //   let temp = temp[1].max.value;
    //   // Sets unrealistic max and min temp ranges as baselines to be changed dynamically
    //   let maxRange = -200;
    //   let minRange = 200;

    //   // For each day in the dailyForecast, determines  the max/min ranges and saves the data to thechartData object
    //   daysArray.forEach((day) => {
    //     if (day.temp > maxRange) {
    //       maxRange = day.temp;
    //     }
    //     if (day.temp < minRange) {
    //       minRange = day.temp;
    //     }
    //     /**/ console.log('test');
    //     this.chartData.labels.push(format(new Date(day.observation_time.value), 'Do'));
    //     this.chartData.datasets[0].data.push(day.temp);
    //     // this.chartData.datasets[1].data.push(day.precipitation_probability.value);
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
