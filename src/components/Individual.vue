<template>
   <v-card-text>
      <p class="subtitle-0">Дата рождения: {{birthday}}</p>
      <p class="subtitle-0">Адрес проживания: {{homePlace}}</p>
      <p class="subtitle-0">Телефон: {{phone}}</p>
      <p class="subtitle-0">Емейл: {{email}}</p>
   </v-card-text>
</template>

<script>

export default {
  name: "Individual",
  props: ['homePlace', 'phone', 'email', 'birthday']
}
</script>

<style scoped></style>