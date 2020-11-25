<template>
  <v-app>
    <v-layout row>
      <v-flex md12>
        <v-container>
          <v-flex>
            <v-list class="mt-5">
              <v-list-item>
                <v-list-item-title
                  class="dicyan--text text--darken-1 display-1"
                >
                  Удаленный доступ
                </v-list-item-title>
                <v-list-item-action>
                  <v-btn class="ma-2" tile outlined color="cyan darken-1">
                    <v-icon left>fas fa-eye</v-icon>See all
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-flex>

          <v-flex>
            <v-row no-gutters>
              <v-col cols="12" md="4">
                <v-row>
                  <v-col cols="12" md="2">
                    <v-card height="80px" width="10px" color="green"></v-card>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-list two-line subheader class="ml-n8">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Всего удаленных подключений</v-list-item-subtitle
                          >
                          <v-list-item-title class="display-1 text--primary">{{
                            getCountAll
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <v-row>
                  <v-col cols="12" md="2">
                    <v-card height="80px" width="10px" color="cyan"></v-card>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-list two-line subheader class="ml-n8">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Постоянный удаленный доступ</v-list-item-subtitle
                          >
                          <v-list-item-title class="display-1 text--primary">{{
                            getCountFixed
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <v-row>
                  <v-col cols="12" md="2">
                    <v-card height="80px" width="10px" color="yellow"></v-card>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-list two-line subheader class="ml-n8">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Временный удаленный доступ</v-list-item-subtitle
                          >
                          <v-list-item-title class="display-1 text--primary">{{
                            getCountTemporary
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-flex>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md12>
        <v-row no-gutters>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Табельный</th>
                  <th class="text-left">Логин</th>
                  <th class="text-left">Статус</th>
                  <th class="text-left">IP</th>
                  <th class="text-left">Сервис</th>
                  <th class="text-left">Работает после 01102020</th>
                  <th class="text-left">Основание</th>
                  <th class="text-left">Прим.</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ppp_clients" :key="item.name">
                  <td>{{ item.personal_number }}</td>
                  <td>{{ item.login }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.ip }}</td>
                  <td>{{ item.service }}</td>
                  <td>{{ item.work_after_01102020 }}</td>
                  <td>{{ item.based_on }}</td>
                  <td>{{ item.prim }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const RouterOSClient = require("routeros-client").RouterOSClient;
export default {
  data: () => ({
    ppp_clients: [],
  }),
  async mounted() {
    await this.fetchPPPClients();
    this.ppp_clients = this.getPPPClients;
    // this.getDataFromMikrotik()
    // this.getVpnUsers()
    // this.getCountConstant();
    // this.fetchUProx()

  },
  methods: {
    ...mapActions(["fetchPPPClients", "getDataFromMikrotik", "getVpnUsers"]),
  },
  computed: {
    ...mapGetters(["getPPPClients"]),
    getCountFixed() {
      const total = this.ppp_clients.filter((item) => {
        return item.status == "постоянный";
      });

      return total.length;
    },
    getCountTemporary() {
      const total = this.ppp_clients.filter((item) => {
        return item.status == "временный";
      });
      return total.length;
    },
    getCountAll() {
      return this.ppp_clients.length;
    },
  },
};
</script>
