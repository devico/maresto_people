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
                  Рабочее место сотрудника сегодня
                </v-list-item-title>
                <v-list-item-action>
                  <v-btn
                    class="ma-2"
                    tile
                    outlined
                    color="cyan darken-1"
                  >
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
                    <v-card
                      height="80px"
                      width="10px"
                      color="green"
                    ></v-card>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-list
                      two-line
                      subheader
                      class="ml-n8"
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >В
                            офисе</v-list-item-subtitle
                          >
                          <v-list-item-title
                            class="display-1 text--primary"
                            >100</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <v-row>
                  <v-col cols="12" md="2">
                    <v-card
                      height="80px"
                      width="10px"
                      color="cyan"
                    ></v-card>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-list
                      two-line
                      subheader
                      class="ml-n8"
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >На
                            удаленке</v-list-item-subtitle
                          >
                          <v-list-item-title
                            class="display-1 text--primary"
                            >2</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <v-row>
                  <v-col cols="12" md="2">
                    <v-card
                      height="80px"
                      width="10px"
                      color="yellow"
                    ></v-card>
                  </v-col>
                  <v-col cols="12" md="10">
                    <v-list
                      two-line
                      subheader
                      class="ml-n8"
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            >Временный удаленный
                            доступ</v-list-item-subtitle
                          >
                          <v-list-item-title
                            class="display-1 text--primary"
                            >3</v-list-item-title
                          >
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
          <v-col cols="12" md12>
            <v-list-item v-for="(user, idx) in active_office_users" :key="idx">
              <v-list-item-content>
                <v-list-item-subtitle
                  >{{user.fullName }}</v-list-item-subtitle
                >
                <v-list-item-title>В офисе</v-list-item-title>
              </v-list-item-content>
              
            </v-list-item>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// const RouterOSClient = require("routeros-client").RouterOSClient;
export default {
  data: () => ({
    skud_clients: [],
    ppp_clients: [],
    ovpn_clients: [],
    active_vpn_users: [],
    duration_work_time: [],
    employees: [],
    active_office_users: []
  }),
  async mounted() {
    await this.fetchEmployees();
    await this.fetchPPPClients();
    await this.getVpnUsers();
    await this.fetchSKUDClients();
    this.fetchActiveVpnUsers();
    await this.fetchSKUDCurrentDay();
    this.employees = await this.getEmployees;
    this.skud_clients = await this.getSKUDClients;
    this.ovpn_clients = await this.getOVPNClients;
    this.ppp_clients = this.getPPPClients;
    this.active_vpn_users = this.getActiveVpnUsers;
    this.active_office_users = this.getActiveOfficeUsers;
    console.log('AU: ', this.active_office_users)
  },
  methods: {
    ...mapActions([
      "fetchSKUDClients",
      "getVpnUsers",
      "fetchPPPClients",
      "getDataFromMikrotik",
      "fetchActiveVpnUsers",
      "fetchEmployees",
      "fetchSKUDCurrentDay"
    ])
  },
  computed: {
    ...mapGetters([
      "getSKUDClients",
      "getOVPNClients",
      "getPPPClients",
      "getActiveVpnUsers",
      "getEmployees",
      "getActiveOfficeUsers"
    ]),
    getEmployeesToday() {},
    getEmployeesOffice() {},
    getEmployeesRemote() {}
  }
};
</script>
