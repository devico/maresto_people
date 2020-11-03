<template>
  <v-app>
    <v-container pa-0>
      <v-flex>
        <v-list class="mt-5">
          <v-list-item>
            <v-list-item-title class="dicyan--text text--darken-1 display-1">
              Рабочее место сотрудника {{ getCurrentDay }}
            </v-list-item-title>
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
                      <v-list-item-subtitle>В офисе</v-list-item-subtitle>
                      <v-list-item-title class="display-1 text--primary"
                        >{{ employeesCount.length }} /
                        {{ active_office_users.length }}</v-list-item-title
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
                <v-card height="80px" width="10px" color="cyan"></v-card>
              </v-col>
              <v-col cols="12" md="10">
                <v-list two-line subheader class="ml-n8">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>На удаленке</v-list-item-subtitle>
                      <v-list-item-title class="display-1 text--primary"
                        >{{ employeesCount.length }} /
                        {{ getVpnEmployes.length }}</v-list-item-title
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
                <v-card height="80px" width="10px" color="yellow"></v-card>
              </v-col>
              <v-col cols="12" md="10">
                <v-list two-line subheader class="ml-n8">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Временный удаленный доступ</v-list-item-subtitle
                      >
                      <v-list-item-title class="display-1 text--primary"
                        >2</v-list-item-title
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
    <v-container>
      <v-row>
        <v-radio-group v-model="workplace" dense row>
          <v-radio label="В офисе" color="green" value="office"></v-radio>
          <v-radio label="На удаленке" color="primary" value="remote"></v-radio>
        </v-radio-group>
      </v-row>
    </v-container>

    <v-container pa-0 fluid>
      <v-row>
        <v-col cols="12" md12>
          <div v-if="workplace === 'remote'">
            <v-list-item v-for="(user, idx) in getVpnEmployes" :key="idx">
              <v-flex>
                <v-card class="ma-5 mt-1" elevation="3">
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="indigo--text"
                          ><h5>{{ user.full_name }}</h5></v-list-item-title
                        >
                        <v-list-item-title
                          >Основание: {{ user.based_on }}</v-list-item-title
                        >
                      </v-list-item-content>
                      <v-list-item-content align="right">
                        <v-list-item-title
                          >Тип подключения:
                          {{ user.service }}</v-list-item-title
                        >
                        <v-list-item-title
                          >Время работы: {{ user.uptime }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-flex>
            </v-list-item>
          </div>
          <div v-if="workplace === 'office' && active_office_users !== 0">
            <v-list-item v-for="(user, idx) in active_office_users" :key="idx">
              <v-flex>
                <v-card class="ma-5 mt-1" elevation="3">
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="indigo--text"
                          ><h5>{{ user.fullName }}</h5></v-list-item-title
                        >
                        <v-list-item-title
                          >В офисе с {{ user.coming }}</v-list-item-title
                        >
                      </v-list-item-content>
                      
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-flex>
            </v-list-item>


          </div>
          <div v-if="workplace === 'office' && active_office_users == 0">
            <v-sheet color="white" align="center"
              ><h5 class="mx-auto mt-10 mb-10">Данные еще не загружены</h5></v-sheet
            >
          </div>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>
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
    active_office_users: [],
    workplace: "office",
    employeesCount: 0,
    typesContact: [],
    contacts: [],
  }),
  async mounted() {
    await this.fetchEmployees();
    await this.fetchPersons();
    await this.fetchPPPClients();
    await this.getVpnUsers();
    await this.fetchSKUDClients();
    this.fetchActiveVpnUsers();
    await this.fetchSKUDCurrentDay();
    await this.fetchTypesContact();
    await this.fetchContacts();
    this.employees = await this.getEmployees;
    this.persons = await this.getPersons;
    this.typesContact = await this.getTypesContact;
    this.contacts = await this.getContacts;
    this.skud_clients = await this.getSKUDClients;
    this.ovpn_clients = await this.getOVPNClients;
    this.ppp_clients = this.getPPPClients;
    this.active_vpn_users = this.getActiveVpnUsers;
    this.active_office_users = this.getActiveOfficeUsers;
    this.getCountEmployeeWithEmail();

    // this.getEmployeesRemote
    // console.log('AU: ', this.getEmployeesRemote)
  },
  methods: {
    ...mapActions([
      "fetchSKUDClients",
      "getVpnUsers",
      "fetchPPPClients",
      "getDataFromMikrotik",
      "fetchActiveVpnUsers",
      "fetchEmployees",
      "fetchPersons",
      "fetchTypesContact",
      "fetchContacts",
      "fetchSKUDCurrentDay",
    ]),
    getEmail(p_id) {
      const cnts = this.contacts.filter((c) => {
        return p_id == c.personKey;
      });

      const email = cnts.filter((c) => {
        const kind = this.typesContact.filter((k) => {
          return c.kind == k.refKey;
        });
        return kind[0].description == "Корпоративная электронная почта";
      });
      if (email[0] == undefined) {
        return "Нет ящика";
      }
      return email[0].description;
    },
    getCountEmployeeWithEmail() {
      const eeCount = this.employees.map((e) => {
        return {
          id: e.refKey,
          // img: this.getImage(e.personKey),
          // full_name: e.description,
          // position: this.getPosition(e.orgPosition),
          // unit: this.getUnit(e.unitKey),
          // phone: this.getPhone(e.personKey),
          // innerPhone: this.getInnerPhone(e.personKey),
          email: this.getEmail(e.personKey),
        };
      });
      this.employeesCount = eeCount.filter((ee) => {
        return ee.email !== "Нет ящика";
      });
    },
  },
  computed: {
    ...mapGetters([
      "getSKUDClients",
      "getOVPNClients",
      "getPPPClients",
      "getActiveVpnUsers",
      "getEmployees",
      "getActiveOfficeUsers",
      "getPersons",
      "getTypesContact",
      "getContacts",
    ]),
    getEmployeesToday() {},
    getEmployeesOffice() {},
    getEmployeesRemote() {
      const avus = this.ppp_clients.filter((avu) => {
        const avp = this.active_vpn_users.filter((v) => {
          return v.name == avu.login;
        });
        return avp[0];
      });
      // console.log('AVS: ', avus)
      return avus;
    },
    getCurrentDay() {
      const today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      return dd + "." + mm + "." + yyyy;
    },
    getVpnEmployes() {
      const vu = this.active_vpn_users.map((ve) => {
        const pc = this.ppp_clients.filter((p) => {
          return p.login == ve.name;
        });
        if (pc[0] !== undefined) {
          return {
            ...ve,
            personal_number: pc[0].personal_number,
            based_on: pc[0].based_on,
          };
        }
      });
      const vua = vu.filter((ve) => {
        return ve !== undefined;
      });
      // console.log('VUA: ', vua)
      const vuae = vua.map((v) => {
        const emps = this.employees.filter((e) => {
          //console.log('E: ', e)
          return v.personal_number == parseInt(e.code, 10);
        });
        if (emps[0] !== undefined) {
          return {
            ...v,
            full_name: emps[0].description,
          };
        }
      });
      const avu = vuae.filter((ve) => {
        return ve !== undefined;
      });
      //console.log("AVU: ", avu);
      return avu.sort();
    },
  },
};
</script>
