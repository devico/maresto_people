<template>
  <v-card-text class="px-0 py-0">
      <p class="subtitle-0">Организация: Наша организация</p>
      <p class="subtitle-0">Подразделение: {{unit}}</p>
      <p class="subtitle-0">Руководитель: Руководитель</p>
      <p class="subtitle-0">Должность: {{orgPosition}}</p>
      <p class="subtitle-0">Место работы: {{workPlace}}</p>
      <p class="subtitle-0">Работает с {{recruitment}}</p>
   </v-card-text>
</template>

<script>

export default {
  name: "Work",
  props: ['unit', 'orgPosition', 'workPlace', 'recruitment']
}
</script>

<style scoped></style>