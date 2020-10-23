<template>
  <v-sheet class="mx-auto mt-5 px-4" width="100%" :elevation="6">
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Организация</strong></p>
        <p class="my-2 subtitle-1">Наша организация</p>
      </div>
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Подразделение</strong></p>
        <p class="my-2 subtitle-1">{{unit}}</p>
      </div>
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Руководитель</strong></p>
        <p class="my-2 subtitle-1">Директор</p>
      </div>
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Должность</strong></p>
        <p class="my-2 subtitle-1">{{orgPosition}}</p>
      </div>
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Место работы</strong></p>
        <p class="my-2 subtitle-1">{{workPlace}}</p>
      </div>
      <div>
        <p class="my-2 subtitle-1 grey--text"><strong>Работает с</strong></p>
        <p class="my-2 subtitle-1">{{recruitment}}</p>
      </div>
      </v-sheet>
</template>

<script>

export default {
  name: "Work",
  props: ['unit', 'orgPosition', 'workPlace', 'recruitment']
}
</script>

<style scoped></style>