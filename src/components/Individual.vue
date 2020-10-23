<template>
  <v-sheet class="mx-auto mt-5 px-4" width="100%" :elevation="6">
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Дата рождения</strong></p>
        <p class="my-2 subtitle-1">{{birthday}}</p>
      </div>
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Адрес проживания</strong></p>
        <p class="my-2 subtitle-1">{{homePlace}}</p>
      </div>
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Телефон</strong></p>
        <p class="my-2 subtitle-1">{{phone}}</p>
      </div>
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Емейл</strong></p>
        <p class="my-2 subtitle-1">{{email}}</p>
      </div>
      </v-sheet>
</template>

<script>

export default {
  name: "Individual",
  props: ['homePlace', 'phone', 'email', 'birthday']
}
</script>

<style scoped></style>