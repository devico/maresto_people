<template>
  <v-card-text >
      <p class="subtitle-0">Организация: Наша организация</p>
      <p class="subtitle-0">Подразделение: {{unit}}</p>
      <p class="subtitle-0">Руководитель: {{chief}}</p>
      <p class="subtitle-0">Должность: {{orgPosition}}</p>
      <p class="subtitle-0">Место работы: {{workPlace}}</p>
      
   </v-card-text>
</template>

<script>

export default {
  name: "Work",
  props: ['unit', 'orgPosition', 'workPlace', 'chief']
}
</script>

<style scoped></style>