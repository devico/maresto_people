<template>
  <v-card-text class="py-0">
      <p class="subtitle-0">{{ rel_degree }}: {{ individ }}</p>
      <p class="subtitle-0">Год рождения: {{ year_burth }}</p>
      <v-divider></v-divider>
   </v-card-text>
</template>

<script>
export default {
  name: "ItemFamily",
  props: ["rel_degree", "individ", "year_burth"]
};
</script>

<style scoped></style>