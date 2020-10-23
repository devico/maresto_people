<template>
    <span>
        Work Place
    </span>  
</template>

<script>
import { apiService } from "../common/api.service.js";
export default {
  name: "WorkPlaceDisplay",
  props: ['work_place'],
  data() {
    return {
      workplaces: [],
    };
  },
  methods: {
    getWorkPlaceEmployee() {
      let endpoint = `/api/employees/${this.work_place}/work_places/`;
      apiService(endpoint).then(data => {
        this.workplaces = data;
      });
    },
  },
  created() {
    // this.getWorkPlaceEmployee();
  }
};
</script>

<style scoped></style>
