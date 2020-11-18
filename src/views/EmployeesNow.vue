<template>
  <v-app>
    <v-container pa-0>
      <v-flex>
        <v-list class="mt-5 mb-5">
          <v-list-item>
            <v-list-item-title class="dicyan--text text--darken-1 display-1">
              Места работы сотрудников сегодня {{ getCurrentDay }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-flex>

      <v-flex>
        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-row>
              <v-col cols="12" md="2">
                <v-card height="80px" width="10px" color="cyan"></v-card>
              </v-col>
              <v-col cols="12" md="10">
                <v-list two-line subheader class="ml-n8">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Всего офисных сотрудника</v-list-item-subtitle
                      >
                      <v-list-item-title class="display-1 text--primary"
                        >88
                        </v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-row>
              <v-col cols="12" md="2">
                <v-card height="80px" width="10px" color="green"></v-card>
              </v-col>
              <v-col cols="12" md="10">
                <v-list two-line subheader class="ml-n8">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Сотрудников в офисе</v-list-item-subtitle
                      >
                      <v-list-item-title class="display-1 text--primary"
                        >{{ active_office_users.length }} 
                        </v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-row>
              <v-col cols="12" md="2">
                <v-card height="80px" width="10px" color="indigo"></v-card>
              </v-col>
              <v-col cols="12" md="10">
                <v-list two-line subheader class="ml-n8">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Удаленный доступ разрешен</v-list-item-subtitle
                      >
                      <v-list-item-title class="display-1 text--primary"
                        >{{ getCountPermissionRemote }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-row>
              <v-col cols="12" md="2">
                <v-card height="80px" width="10px" color="yellow"></v-card>
              </v-col>
              <v-col cols="12" md="10">
                <v-list two-line subheader class="ml-n8">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >Активные на удаленке</v-list-item-subtitle
                      >
                      <v-list-item-title class="display-1 text--primary"
                        >{{ getVpnEmployes.length }}</v-list-item-title
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
          <v-radio label="Посещали офис" color="green" value="office"></v-radio>
          <v-radio label="Подключались на удаленку" color="primary" value="remote"></v-radio>
          <v-radio label="Активные на удаленке" color="primary" value="active_remote"></v-radio>
        </v-radio-group>
      </v-row>
    </v-container>

    <v-container pa-0 fluid>
      <v-row>
        <v-col cols="12" md12>
          <section>
            <Loader v-if="loading" />
            <div v-else>
              <div v-if="workplace === 'active_remote'">
                <v-list-item v-for="(user, idx) in sortVPNUsersByTime" :key="idx">
                  <v-flex>
                    <v-card class="ma-5 mt-1" elevation="3">
                      <v-list :color="user.color">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title class="text--white"
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
                              >Начало работы:
                              {{ user.start_time_work }}</v-list-item-title
                            >
                            <v-list-item-title
                              >Продолжительность работы:
                              {{ user.duration }} часов</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-list-item>
              </div>
                <div v-if="workplace === 'remote'">
                <v-list-item v-for="(user, idx) in sortTodayVpnUsersByTime" :key="idx">
                  <v-flex>
                    <v-card class="ma-5 mt-1" elevation="3">
                      <v-list :color="user.color">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title class="text--white"
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
                              >Начало работы:
                              {{ user.start_time_work }}</v-list-item-title
                            >                            
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-list-item>
              </div>
              <div v-if="workplace === 'office' && active_office_users !== 0">
                <v-list-item
                  v-for="(user, idx) in sortActiveUsersByTime"
                  :key="idx"                  
                >
                  <v-flex>
                    <v-card 
                      class="ma-5 mt-1"
                      elevation="3"
                    >
                      <v-list :color="user.color">
                        <v-list-item> 
                          <v-list-item-content>
                            <v-list-item-title class="text--white"
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
                  ><h5 class="mx-auto mt-10 mb-10">
                    Данные еще не загружены
                  </h5></v-sheet
                >
              </div>
            </div>
          </section>
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
    loading: true,
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
    today_start_vpn_users: [],
    today_vpn_clients: [],
    today_vpn_employees: []
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
    await this.fetchVpnUsersFromDB()
    this.employees = await this.getEmployees;
    this.persons = await this.getPersons;
    this.typesContact = await this.getTypesContact;
    this.contacts = await this.getContacts;
    this.skud_clients = await this.getSKUDClients;
    this.ovpn_clients = await this.getOVPNClients;
    this.ppp_clients = await this.getPPPClients;
    this.active_vpn_users = await this.getActiveVpnUsers;
    this.active_office_users = await this.getActiveOfficeUsers;
    this.today_start_vpn_users = this.getVpnUserStartConnections
    this.getCountEmployeeWithEmail();
    this.sortActiveUsersByTime
    this.sortVPNUsersByTime    
    this.prepareTodayStartVpnUsers()
    this.today_vpn_employees = this.getTodayVpnEmployes
    this.loading = false

    // this.getEmployeesRemote
    // array.sort((a, b) => {
    //   return new Date(b.date) - new Date(a.date) 
    // })
    
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
      "fetchVpnUsersFromDB",
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
    calcTime(times) {
      const total_array = times.split(":");
      if (total_array[1] !== undefined) {
        return ((parseInt(total_array[0], 10) * 60 + parseInt(total_array[1], 10)) / 60).toFixed(2)
      } else {
        return parseInt(total_array[0]);
      }
    },
    calcTimeVpnToday(times) {
      const total_array = times.split(":");
      if (total_array[1] !== undefined) {
        return ((parseInt(total_array[0], 10) * 60 + parseInt(total_array[1], 10)) / 60).toFixed(2)
      } else {
        return parseInt(total_array[0]);
      }
    },
    prepareTodayStartVpnUsers() {
      const today_vpn_clients = this.today_start_vpn_users.filter((oc, i) => {
        const pcs = this.ppp_clients.filter((pc) => {
          return oc.login == pc.login;
        });
        
        if (pcs[0] !== undefined) {
          return {
            ...oc,
            personal_number: pcs[0].personal_number,
          };
        }
      });
      
      this.today_vpn_clients = today_vpn_clients
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
      "getVpnUserStartConnections"
    ]),
    
    sortActiveUsersByTime() {
      let currentTime = new Date()
      let month = currentTime.getMonth() + 1
      let year = currentTime.getFullYear()
      let day = currentTime.getDate()
      
      const aou = this.active_office_users.map(u => {
        return {
          coming: u.coming,
          coming_time: `${year}-${month}-${day}T${u.coming}`,
          date: u.date,
          fullName: u.fullName,
          personal_number: u.personal_number,
          color: this.calcTime(u.coming) <= 9.25 ? 'green lighten-2' : 'red lighten-2'
        }
      })
      
      aou.sort((a, b) => {
        return new Date(b.coming_time) - new Date(a.coming_time) 
      })
      
      return aou.reverse()
    },
    sortVPNUsersByTime() {
      let currentTime = new Date()
      let month = currentTime.getMonth() + 1
      let year = currentTime.getFullYear()
      let day = currentTime.getDate()
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes()


      let vpn_usrs = this.getVpnEmployes
      console.log("vpn_users", vpn_usrs)
      const match_hh = /^(\d{1,2}h)/i
      const match_mm = /^(\d{1,2}m)/i
      const match_ss = /^(\d{1,2}s)/i

      let hour = ''
      let mm = ''
      let ss = ''
      
      const moment = ((parseInt(hours)*60  + parseInt(minutes)) / 60).toFixed(2)

      const vau = vpn_usrs.map(u => {
        if ((u.uptime).match(match_hh)) {
          let hr = (u.uptime).split('h')
          hour = hr[0]
          mm = hr[1].split('m')[0]
          ss = 0
        } else if ((u.uptime).match(match_mm)) {
          hour = 0
          mm = (u.uptime).split('m')[0]
          ss = 0
        } else if ((u.uptime).match(match_ss)) {
          hour = 0
          mm = 0
          ss = (u.uptime).split('s')[0]
        }

        const duration = ((parseInt(hour)*60  + parseInt(mm)) / 60).toFixed(2)
        const start_work = (moment - duration).toFixed(2)
        const start_hh_mm = ("" + start_work).split('.')
        let start_hh = start_hh_mm[0]
        start_hh = start_hh.length == 1 ? `0${start_hh}` : start_hh
        let start_mm = `0.${start_hh_mm[1]}`
        start_mm = "" + parseInt((parseFloat(start_mm) * 60))
        start_mm = start_mm.length == 1 ? `0${start_mm}` : start_mm
        const start_time_work = `${start_hh}:${start_mm}:00`
        
        return {
          ...u,
          duration: duration,
          start_time_work: start_time_work,
          color: start_work <= 9.25 ? 'green lighten-2' : 'red lighten-2'
        }
      })
      
      // aou.sort((a, b) => {
      //   return new Date(b.coming_time) - new Date(a.coming_time) 
      // })
      
      // return aou.reverse()
      return vau

    },
    sortTodayVpnUsersByTime() {
      let currentTime = new Date()
      let month = currentTime.getMonth() + 1
      let year = currentTime.getFullYear()
      let day = currentTime.getDate()
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes()

      let vpn_usrs = this.today_vpn_employees
      
      let hour = ''
      let mm = ''
      let ss = ''
      
      const moment = ((parseInt(hours)*60  + parseInt(minutes)) / 60).toFixed(2)

      const vau = vpn_usrs.map(u => {
        hour = (u.timestamp).substring(11, 13)
        mm = (u.timestamp).substring(14, 16)
        hour = parseInt(hour) + 2
        hour = hour.length == 1 ? `0${hour}` : hour
        
        // const duration = ((parseInt(hour)*60  + parseInt(mm)) / 60).toFixed(2)
        // const start_work = (moment - duration).toFixed(2)
        const start_time_work = `${hour}:${mm}:00`

        return {
          ...u,
          start_time_work: start_time_work,
          color: this.calcTimeVpnToday(`${hour}:${mm}`) <= 9.25 ? 'green lighten-2' : 'red lighten-2'
        }
      })
      
      vau.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp) 
      })
      
      return vau.reverse()

    },
    getEmployeesToday() {},
    getEmployeesOffice() {},
    getEmployeesRemote() {
      const avus = this.ppp_clients.filter((avu) => {
        const avp = this.active_vpn_users.filter((v) => {
          return v.name == avu.login;
        });
        return avp[0];
      });
      
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
      
      const vuae = vua.map((v) => {
        const emps = this.employees.filter((e) => {
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

      return avu.sort();
    },
    getTodayVpnEmployes() {
      const vu = this.today_vpn_clients.map((ve) => {
        const pc = this.ppp_clients.filter((p) => {
          return p.login == ve.login;
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
      
      const vuae = vua.map((v) => {
        const emps = this.employees.filter((e) => {
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
      
      return avu.sort();
    },
    getCountPermissionRemote() {
      const pcs = this.ppp_clients.filter((p) => {
        return p.status == "постоянный" || p.status == "временный";
      });
      
      return pcs.length;
    },
  },
};
</script>
