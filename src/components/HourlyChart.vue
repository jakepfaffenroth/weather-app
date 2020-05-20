<template>
  <div v-if="isHourlyLoaded">
    <line-chart
      id="chart"
      class="relative w-8071px"
      :chart-data="this.chartData"
      :options="this.chartOptions"
      :styles="chartStyles"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from '../assets/lineChart.js';
// import VueApexCharts from 'vue-apexcharts';
import format from 'date-fns/format';

export default {
  props: {
    isHourlyLoaded: Boolean,
  },
  components: {
    LineChart,
  },
  computed: {
    chartStyles() {
      return {
        position: 'relative',
        display: 'block',
        width: this.getScrollerWidth(),
        height: '200px',
      };
    },
  },
  data() {
    return {
      scrollerWidth: 0,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Temp',
            data: [],
            borderColor: 'RGB(248, 132, 34)',
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 3,
            pointRadius: 0,
          },
        ],
      },
      chartOptions: {
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
            font:{
              size:'13',
            }
          },
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
                beginAtZero: false,
                suggestedMax: 0,
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
      },
      chartMaxRange: null,
      chartMinRange: null,
    };
  },
  mounted() {
    this.getScrollerWidth();
    // this.renderChart(this.chartData, this.chartOptions);
  },
  methods: {
    getScrollerWidth() {
      const scroller = document.getElementById('hourly-scroller');
      return scroller.scrollWidth + 'px';
    },
  },
  created() {
    let hoursArray = this.$store.getters.hourlyForecast;

    // Sets unrealistic max and min temp ranges as baselines to be changed dynamically
    let maxRange = -200;
    let minRange = 200;

    // For each hour in the hourlyForecast, determines  the max/min ranges and saves the data to thechartData object
    hoursArray.forEach((hour) => {
      if (hour.temp.value > maxRange) {
        maxRange = hour.temp.value;
      }
      if (hour.temp.value < minRange) {
        minRange = hour.temp.value;
      }
      this.chartData.labels.push(format(new Date(hour.observation_time.value), 'ha'));
      this.chartData.datasets[0].data.push(hour.temp.value);
    });
    // Adds buffer to y-axis range
    this.chartOptions.scales.yAxes[0].ticks.suggestedMax = (maxRange + 5).toFixed();
    this.chartOptions.scales.yAxes[0].ticks.suggestedMin = (minRange - 3).toFixed();
  },
};
</script>

<style></style>
