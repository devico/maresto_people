<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    class="pt-4"
    color="white"
    width="200"
  >
    <v-row justify="center" class="mb-5" >
      <v-img
        max-height="54"
        max-width="170"
        :src="require('../assets/images/siteIcon-maresto.png')"
      ></v-img>
    </v-row>
    <v-spacer></v-spacer>
    <v-list flat rounded>
      <v-list-item-group
        v-model="item"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in menyItems"
          :key="i"
          link
          :to="item.url"
        >
          <v-list-item-icon 
            
            >
            <v-icon 
              v-text="item.icon"
            ></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiAccount,
  mdiCalendar,
  mdiAccountGroup,
  mdiFileChart,
  mdiBookshelf,
  mdiTextBoxCheckOutline,
} from "@mdi/js";
export default {
  data() {
    return {
      value: 1,
      drawer: true,
      mini: true,
      item: 1,
      menyItems: [
        { title: "Задачи", icon: mdiTextBoxCheckOutline, url: "/list" },
        { title: "Календарь", icon: mdiCalendar, url: "/new" },
        { title: "Сотрудники", icon: mdiAccountGroup, url: "/employees" },
        { title: "База знаний", icon: mdiBookshelf, url: "/checkout" },
        { title: "Отчеты", icon: mdiFileChart, url: "/login" },
      ],
      mdiAccount: mdiAccount,
    };
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
