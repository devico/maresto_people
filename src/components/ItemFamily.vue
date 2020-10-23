<template>
  <div>
    <v-card class="mt-2">
      <v-row justify="start" align="start">
        <v-col>
          <v-card-title class="pt-0">{{ individ }}</v-card-title>
          <v-card-text class="pt-0">{{ rel_degree }}</v-card-text>
          <v-card-text class="pt-0"
            >Год рождения: {{ year_burth }}</v-card-text
          >
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ItemFamily",
  props: ["rel_degree", "individ", "year_burth"]
};
</script>

<style scoped></style>