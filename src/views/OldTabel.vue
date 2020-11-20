<template>
  <v-app>
    <v-layout row>
      <v-flex md12>
        <v-container >
          <v-flex>
            <v-list class="mt-5">
              <v-list-item>
                <v-list-item-title
                  class="dicyan--text text--darken-1 display-1"
                >
                  Удаленный доступ
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
                            >Всего удаленных
                            подключений</v-list-item-subtitle
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
                            >Постоянный удаленный
                            доступ</v-list-item-subtitle
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
          <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" >Логин</th>
          <th class="text-left">01</th>
          <th class="text-left">02</th>
          <th class="text-left">03</th>
          <th class="text-left">04</th>
          <th class="text-left">05</th>
          <th class="text-left">06</th>
          <th class="text-left">07</th>
          <th class="text-left">08</th>
          <th class="text-left">09</th>
          <th class="text-left">10</th>
          <th class="text-left">11</th>
          <th class="text-left">12</th>
          <th class="text-left">13</th>
          <th class="text-left">14</th>
          <th class="text-left">15</th>
          <th class="text-left">16</th>
          <th class="text-left">17</th>
          <th class="text-left">18</th>
          <th class="text-left">19</th>
          <th class="text-left">20</th>
          <th class="text-left">21</th>
          <th class="text-left">22</th>
          <th class="text-left">23</th>
          <th class="text-left">24</th>
          <th class="text-left">25</th>
          <th class="text-left">26</th>
          <th class="text-left">27</th>
          <th class="text-left">28</th>
          <th class="text-left">29</th>
          <th class="text-left">30</th>
          <th class="text-left">31</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in fillTableVPN"
          :key="idx"
        >
          <td>{{ item.login }}</td>
          <td>{{ item.day1 }}</td>
          <td>{{ item.day2 }}</td>
          <td>{{ item.day3 }}</td>
          <td>{{ item.day4 }}</td>
          <td>{{ item.day5 }}</td>
          <td>{{ item.day6 }}</td>
          <td>{{ item.day7 }}</td>
          <td>{{ item.day8 }}</td>
          <td>{{ item.day9 }}</td>
          <td>{{ item.day10 }}</td>
          <td>{{ item.day11 }}</td>
          <td>{{ item.day12 }}</td>
          <td>{{ item.day13 }}</td>
          <td>{{ item.day14 }}</td>
          <td>{{ item.day15 }}</td>
          <td>{{ item.day16 }}</td>
          <td>{{ item.day17 }}</td>
          <td>{{ item.day18 }}</td>          
          <td>{{ item.day19 }}</td>
          <td>{{ item.day20 }}</td>
          <td>{{ item.day21 }}</td>
          <td>{{ item.day22 }}</td>
          <td>{{ item.day23 }}</td>
          <td>{{ item.day24 }}</td>
          <td>{{ item.day25 }}</td>
          <td>{{ item.day26 }}</td>
          <td>{{ item.day27 }}</td>
          <td>{{ item.day28 }}</td>
          <td>{{ item.day29 }}</td>
          <td>{{ item.day30 }}</td>
          <td>{{ item.day31 }}</td>
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
// const RouterOSClient = require("routeros-client").RouterOSClient;
export default {
  data: () => ({
    skud_clients: [],
    ppp_clients: [],
    ovpn_clients: [],
    duration_work_time: []
  }),
  async mounted() {
    await this.fetchPPPClients();
    await this.getVpnUsers();
    await this.fetchSKUDClients();
    this.skud_clients = await this.getSKUDClients;
    this.ovpn_clients = await this.getOVPNClients;
    this.ppp_clients = this.getPPPClients;
    this.duration_work_time = this.calcDurationWorkTime;
    this.getDataFromMikrotik()
    // this.getVpnUsers()
    // this.getCountConstant();
  },
  methods: {
    ...mapActions(["fetchSKUDClients", "getVpnUsers", "fetchPPPClients", 'getDataFromMikrotik']),
    toHHMM(uptime) {
      var sec_num = parseInt(uptime, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },
    getDuration(login, date) {
      const dateLogin = this.duration_work_time.filter(i => {
        return i.login === login
      })
      const days = dateLogin.map(d => {
        const ds = d.days.filter(i => {
          return i.date == date          
        })
        return ds
      })
      const total_duration = days[0].reduce((a, b) => {        
        return a += b.uptime
      }, 0)
      //console.log('TT', total_duration)     
      return this.toHHMM(total_duration)
    }
  },
  computed: {
    ...mapGetters(["getSKUDClients", "getOVPNClients", "getPPPClients"]),
    calcDurationWorkTime() {
      return this.ovpn_clients.map(vc => {
        const logins = vc.connections.map(c => {
          return {
            date: c.timestamp.substring(0, 10),
            uptime: c.uptime,
            duration: this.toHHMM(c.uptime)
          };
        });
        return {
          login: vc.login,
          days: logins
        };
      });
    },
    fillTableVPN() {
      const year = '2020'
      const month = '09'
      return this.duration_work_time.map(i => {
          return {
            login: i.login,
            day1: this.getDuration(i.login, `${year}-${month}-01`),
            day2: this.getDuration(i.login, `${year}-${month}-02`),
            day3: this.getDuration(i.login, `${year}-${month}-03`),
            day4: this.getDuration(i.login, `${year}-${month}-04`),
            day5: this.getDuration(i.login, `${year}-${month}-05`),
            day6: this.getDuration(i.login, `${year}-${month}-06`),
            day7: this.getDuration(i.login, `${year}-${month}-07`),
            day8: this.getDuration(i.login, `${year}-${month}-08`),
            day9: this.getDuration(i.login, `${year}-${month}-09`),
            day10: this.getDuration(i.login, `${year}-${month}-10`),
            day11: this.getDuration(i.login, `${year}-${month}-11`),
            day12: this.getDuration(i.login, `${year}-${month}-12`),
            day13: this.getDuration(i.login, `${year}-${month}-13`),
            day14: this.getDuration(i.login, `${year}-${month}-14`),
            day15: this.getDuration(i.login, `${year}-${month}-15`),
            day16: this.getDuration(i.login, `${year}-${month}-16`),
            day17: this.getDuration(i.login, `${year}-${month}-17`),
            day18: this.getDuration(i.login, `${year}-${month}-18`),
            day19: this.getDuration(i.login, `${year}-${month}-19`),
            day20: this.getDuration(i.login, `${year}-${month}-20`),
            day21: this.getDuration(i.login, `${year}-${month}-21`),
            day22: this.getDuration(i.login, `${year}-${month}-22`),
            day23: this.getDuration(i.login, `${year}-${month}-23`),
            day24: this.getDuration(i.login, `${year}-${month}-24`),
            day25: this.getDuration(i.login, `${year}-${month}-25`),
            day26: this.getDuration(i.login, `${year}-${month}-26`),
            day27: this.getDuration(i.login, `${year}-${month}-27`),
            day28: this.getDuration(i.login, `${year}-${month}-28`),
            day29: this.getDuration(i.login, `${year}-${month}-29`),
            day30: this.getDuration(i.login, `${year}-${month}-30`),
            day31: this.getDuration(i.login, `${year}-${month}-31`),
            // total: r.total
          }
      })
    },
    
    // getCountFixed() {
    //   const total = this.ppp_clients.filter((item) => {
    //   return item.status == "постоянный";
    //   });
    //   return total.length;
    // },
    // getCountTemporary() {
    //   const total = this.ppp_clients.filter((item) => {
    //   return item.status == "временный";
    //   });
    //   return total.length;
    // },
    // getCountAll() {
    //   return this.ppp_clients.length;
    // },
  }
};
</script>