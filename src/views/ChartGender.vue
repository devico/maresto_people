<template>
  <div>
    <div id="chart">
      <apexchart
        width="380"
        :options="chartOptions"
        :series="series[0].data"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  props: ['series', 'chartOptions'],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      //series: [44, 55, 13, 43, 22],
    //   chartOptions: {
    //     chart: {
    //       width: 380,
    //       type: "pie",
    //     },
    //     labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    //     responsive: [
    //       {
    //         breakpoint: 480,
    //         options: {
    //           chart: {
    //             width: 200,
    //           },
    //           legend: {
    //             position: "bottom",
    //           },
    //         },
    //       },
    //     ],
    //   },
    };
  },
  mounted() {
      // console.log("S: ", this.series)
  }
};
</script>
