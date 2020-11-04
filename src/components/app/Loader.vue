<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <div class="text-center">
          <v-progress-circular :size="70" :width="7" color="blue" indeterminate></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    color() {
      const colors = ["amber", "green", "primary"];
      return colors[Math.floor(Math.random() * 3)];
    }
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>


