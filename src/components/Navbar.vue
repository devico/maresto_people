<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent=""
      color="#2C3A47"
      dark
      app
    >
    <v-list-item class="px-2 pt-1">
      <v-list-item-avatar>
        <v-img
        class="mx-auto"
        :src="require('../assets/images/M1.png')"
      ></v-img>        
      </v-list-item-avatar>
      <v-list-item-title class="ml-4 text-capitalize">
        People Maresto
      </v-list-item-title>
    </v-list-item>
    <v-list shaped class="clickable">
      <template v-for="item in items">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item['icon-ctr']"
          :append-icon="item.model ? item.icon : item['icon-alt']"
          active-class="teal accent-4 black--text"
          class="routerLink"
        >
           <template v-slot:activator>
             <v-list-item-content>
               <v-list-item-title>
                 {{item.text}}
               </v-list-item-title>
             </v-list-item-content>
           </template>
           <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            route :to="child.route"
            active-class="teal accent-4 black--text"
            class="routerLink"
           >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{child.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                 {{child.text}}
               </v-list-item-title>
            </v-list-item-content>
           </v-list-item>
        </v-list-group>
        <v-list-item 
          v-else
          :key="item.text"
          active-class="teal accent-4 black--text"
          route
          :to="item.route"
          class="routerLink"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            {{item.text}}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
    </v-navigation-drawer>
    
<!--   <v-navigation-drawer
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
          <v-list-item-icon>
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
  </v-navigation-drawer> -->
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
      mini: false,
      fab: false,
      item: 1,
      items: [
      { icon: "mdi-home", text: "Главная", route: "/" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        "icon-ctr": "mdi-account-group",
        text: "Сотрудники",
        model: false,
        children: [
          { icon: "mdi-account-box-multiple", text: "Список", route: "/employees" },
          { icon: "mdi-text-box-check-outline", text: "Табель", route: "/tablesheet" },
          { icon: "mdi-calendar", text: "Календарь", route: "/calendar" },
        ],
      },
      
      { icon: "mdi-finance", text: "Отчеты", route: "/reports" },
      { icon: "mdi-chart-pie", text: "Опросы", route: "/polls" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        "icon-ctr": "mdi-google-maps",
        text: "Офис/Удаленка",
        model: false,
        children: [
          { icon: "mdi-lock-open-plus", text: "Доступы", route: "/ppp" },
          { icon: "mdi-remote-desktop", text: "Офис | Онлайн", route: "/employeesnow" },
        ],
      },
      // { icon: "mdi-magnify", text: "База знаний", route: "/Recherche" },
    ],
      // menyItems: [
      //   { title: "Задачи", icon: mdiTextBoxCheckOutline, url: "/list" },
      //   { title: "Календарь", icon: mdiCalendar, url: "/calendar" },
      //   { title: "Сотрудники", icon: mdiAccountGroup, url: "/employees" },
      //   { title: "База знаний", icon: mdiBookshelf, url: "/checkout" },
      //   { title: "Отчеты", icon: mdiFileChart, url: "/reports" },
      //   { title: "Табель", icon: mdiFileChart, url: "/tablesheet" },
      //   { title: "PPP", icon: mdiFileChart, url: "/ppp" },
      //   { title: "Cегодня", icon: mdiFileChart, url: "/employeesnow" },
      // ],
      mdiAccount: mdiAccount,
    };
  },
  mounted() {
    
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
.routerLink{
  text-decoration: none;
}
a.routerLink:hover, a.routerLink:focus {
  text-decoration: none;
}
</style>
