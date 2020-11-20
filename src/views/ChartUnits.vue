<template>
  <div>
    <div>
      <apexchart
        height="800"
        width="100%"
        :options="chartOptions"
        :series="series"
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
      
    };
  },
  mounted() {
    
  }
};
</script>
