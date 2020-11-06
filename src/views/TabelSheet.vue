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
                  Табель
                </v-list-item-title>
                
              </v-list-item>
            </v-list>
          </v-flex>
          <v-flex>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="select_year"
                      :items="years"
                      :rules="[v => !!v || 'Обязательно нужно выбрать']"
                      label="Выберите год"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="select_month"
                      :items="months"
                      :item-text="'month'"
                      :item-value="'value'"
                      :rules="[v => !!v || 'Обязательно нужно выбрать']"
                      label="Выберите месяц"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn
                      :disabled="!valid"
                      class="ma-2"
                      tile
                      outlined
                      color="cyan darken-1"
                      @click="fillGS"
                    >
                      Заполнить
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-flex>


        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row>
      <!-- <v-flex>
                    <v-card class="ma-5 mt-1" elevation="3">
                      <v-list>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title class="indigo--text"
                              ><h5>1</h5></v-list-item-title
                            >
                            <v-list-item-title
                              >2</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-flex> -->
      <v-flex md12 align-end>
        <div class="ma-5 mt-1" elevation="1">
          <v-expansion-panels
            v-model="panel"
            multiple
          >
            <v-expansion-panel
              v-for="(item,i) in complete_clients"
              :key="i"
              class="ma-5 mt-1" elevation="1"
            >
              
              <v-expansion-panel-header>{{ item.fullName }} | Табельный: {{item.personal_number}} </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div>
                  
                  <v-sheet height="600">
                    <v-calendar
                      ref="calendar"
                      v-model="value"
                      :weekdays="weekday"
                      :type="type"
                      :events="events"
                      :event-overlap-mode="mode"
                      :event-overlap-threshold="30"
                      
                    ></v-calendar>
                  </v-sheet>
                </div>
              </v-expansion-panel-content>
                    
              
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// const RouterOSClient = require("routeros-client").RouterOSClient;
export default {
  data: () => ({
    type: 'month',
    types: ['month', 'week', 'day', '4day'],
    mode: 'stack',
    modes: ['stack', 'column'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    panel: [],
    items: 5,
    valid: false,
    select_year: null,
    select_month: null,
    years: [
      '2020',
      '2021',
    ],
    months: [
      {month: 'Январь', value: '01'},
      {month: 'Февраль', value: '02'},
      {month: 'Март', value: '03'},
      {month: 'Апрель', value: '04'},
      {month: 'Май', value: '05'},
      {month: 'Июнь', value: '06'},
      {month: 'Июль', value: '07'},
      {month: 'Август', value: '08'},
      {month: 'Сентябрь', value: '09'},
      {month: 'Октябрь', value: '10'},
      {month: 'Ноябрь', value: '11'},
      {month: 'Декабрь', value: '12'},
    ],
    employees: [],
    ppp_clients: [],
    skud_clients: [],
    ovpn_clients: [],
    duration_work_time: [],
    all_clients: [],
    vpn_clients: [],
    clear_vpn_clients: [],
    complete_clients: [],
  }),
  async mounted() {
    await this.fetchEmployees()
    await this.fetchPPPClients();
    await this.fetchSKUDClients();
    await this.getVpnUsers();
    this.employees = await this.getEmployees
    this.ppp_clients = this.getPPPClients;
    this.skud_clients = await this.getSKUDClients;
    this.ovpn_clients = await this.getOVPNClients;
  },
  methods: {
    ...mapActions(["fetchEmployees", "fetchSKUDClients", "setEmployeesToTabel", "getVpnUsers", "fetchPPPClients"]),
    async fillGS() {
      if (this.$refs.form.validate()) {
        this.duration_work_time = this.calcDurationWorkTime;
        this.all_clients = this.prepareSkudClients()
        this.vpn_clients = this.prepareVPNClients()
        this.clear_vpn_clients = this.convertTimeVPNClients({month: this.select_month, year: this.select_year})
        this.complete_clients = this.fillDataForGS()
        await this.setEmployeesToTabel({data: this.complete_clients, month: this.select_month, year: this.select_year})        
      }
      
    },
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
    convertSkudTimeToDuration(time) {
      if (time !== '0:00') {
        const total_array = time.split(':')
        if (total_array[1] !== undefined) {
          return ((parseInt(total_array[0], 10) * 60 + parseInt(total_array[1], 10)) / 60).toFixed(2).replace('.', ',')
        } else {
          return parseInt(total_array[0])
        }
      } else {
        return 0
      }
    },
    prepareSkudClients() {
      return this.skud_clients.map(sc => {
        return {
            fullName: sc.fullName,
            personal_number: parseInt(sc.personal_number, 10),
            day1: this.convertSkudTimeToDuration(sc.num1),
            day2: this.convertSkudTimeToDuration(sc.num2),
            day3: this.convertSkudTimeToDuration(sc.num3),
            day4: this.convertSkudTimeToDuration(sc.num4),
            day5: this.convertSkudTimeToDuration(sc.num5),
            day6: this.convertSkudTimeToDuration(sc.num6),
            day7: this.convertSkudTimeToDuration(sc.num7),
            day8: this.convertSkudTimeToDuration(sc.num8),
            day9: this.convertSkudTimeToDuration(sc.num9),
            day10: this.convertSkudTimeToDuration(sc.num10),
            day11: this.convertSkudTimeToDuration(sc.num11),
            day12: this.convertSkudTimeToDuration(sc.num12),
            day13: this.convertSkudTimeToDuration(sc.num13),
            day14: this.convertSkudTimeToDuration(sc.num14),
            day15: this.convertSkudTimeToDuration(sc.num15),
            day16: this.convertSkudTimeToDuration(sc.num16),
            day17: this.convertSkudTimeToDuration(sc.num17),
            day18: this.convertSkudTimeToDuration(sc.num18),
            day19: this.convertSkudTimeToDuration(sc.num19),
            day20: this.convertSkudTimeToDuration(sc.num20),
            day21: this.convertSkudTimeToDuration(sc.num21),
            day22: this.convertSkudTimeToDuration(sc.num22),
            day23: this.convertSkudTimeToDuration(sc.num23),
            day24: this.convertSkudTimeToDuration(sc.num24),
            day25: this.convertSkudTimeToDuration(sc.num25),
            day26: this.convertSkudTimeToDuration(sc.num26),
            day27: this.convertSkudTimeToDuration(sc.num27),
            day28: this.convertSkudTimeToDuration(sc.num28),
            day29: this.convertSkudTimeToDuration(sc.num29),
            day30: this.convertSkudTimeToDuration(sc.num30),
            day31: this.convertSkudTimeToDuration(sc.num31) || 0,
            // total: r.total
          }
      })      
    },
    convertTimeVPNClients(date) {
      const year = '2020'
      const month = '10'
      const b = this.vpn_clients.map(vc => {
        const work_time = this.getDuration(vc.login, vc.date)
        return {
          ...vc,
          work_time: work_time
        }
      })      
      
      const filtered_by_zero = b.filter(i => {
        return i.personal_number !== 0
      })

      const filtered = filtered_by_zero.filter(i => {
        return i.personal_number !== ""
      })
      
      return filtered
    },
    prepareVPNClients() {
      const vpn_clients = this.duration_work_time.map((oc, i) => {
        const pcs = this.ppp_clients.filter(pc => {
          return oc.login == pc.login
        })
        
        if (pcs[0] !== undefined) {
          return {
            ...oc,
            personal_number: pcs[0].personal_number
          }
        } else {
          return {
            ...oc,
            personal_number: 0
          }
        }        
      })
      
      return vpn_clients
      
    },
    getDuration(login, date) {
      const dateLogin = this.duration_work_time.filter(i => {
        return i.login === login
      })
      
      const days = dateLogin.filter(d => {
        return d.date == date
      })

      let total_duration = 0
      
      if (days.length > 1) {
        total_duration = days.reduce((a, b) => {        
          return a += b.uptime
        }, 0)
      } else {
        total_duration = days[0].uptime
      }
      
      return this.toHHMM(total_duration)
    },
    checkRemote(skud, id, day) {
      if (skud == 0) {
        let value = 0
        const days_remote_id = this.clear_vpn_clients.filter(v => {
          return v.personal_number == id
        })
        
        const df = days_remote_id.filter(d => {
          return d.date == day
        })        

        if (df[0] !== undefined) {
          const dur = this.convertSkudTimeToDuration(df[0].duration)
          if (dur !== undefined) {
            value = dur
          } else {
            value = 0
          }
        }
        return `#${value}`
      } else {
        return `*${skud}`
      }
      
      
    },
    fillDataForGS() {
      const year = '2020'
      const month = '10'
      const array = this.employees.map(e => {
        const sk = this.all_clients.filter(i => {
          return parseInt(e.code, 10) == i.personal_number
        })
        if (sk[0] !== undefined) {
          
          return {
            personal_number: parseInt(e.code, 10),
            fullName: e.description,
            day1: this.checkRemote(sk[0].day1, parseInt(e.code, 10), `${year}-${month}-01`),
            day2: this.checkRemote(sk[0].day2, parseInt(e.code, 10), `${year}-${month}-02`),
            day3: this.checkRemote(sk[0].day3, parseInt(e.code, 10), `${year}-${month}-03`),
            day4: this.checkRemote(sk[0].day4, parseInt(e.code, 10), `${year}-${month}-04`),
            day5: this.checkRemote(sk[0].day5, parseInt(e.code, 10), `${year}-${month}-05`),
            day6: this.checkRemote(sk[0].day6, parseInt(e.code, 10), `${year}-${month}-06`),
            day7: this.checkRemote(sk[0].day7, parseInt(e.code, 10), `${year}-${month}-07`),
            day8: this.checkRemote(sk[0].day8, parseInt(e.code, 10), `${year}-${month}-08`),
            day9: this.checkRemote(sk[0].day9, parseInt(e.code, 10), `${year}-${month}-09`),
            day10: this.checkRemote(sk[0].day10, parseInt(e.code, 10), `${year}-${month}-10`),
            day11: this.checkRemote(sk[0].day11, parseInt(e.code, 10), `${year}-${month}-11`),
            day12: this.checkRemote(sk[0].day12, parseInt(e.code, 10), `${year}-${month}-12`),
            day13: this.checkRemote(sk[0].day13, parseInt(e.code, 10), `${year}-${month}-13`),
            day14: this.checkRemote(sk[0].day14, parseInt(e.code, 10), `${year}-${month}-14`),
            day15: this.checkRemote(sk[0].day15, parseInt(e.code, 10), `${year}-${month}-15`),
            day16: this.checkRemote(sk[0].day16, parseInt(e.code, 10), `${year}-${month}-16`),
            day17: this.checkRemote(sk[0].day17, parseInt(e.code, 10), `${year}-${month}-17`),
            day18: this.checkRemote(sk[0].day18, parseInt(e.code, 10), `${year}-${month}-18`),
            day19: this.checkRemote(sk[0].day19, parseInt(e.code, 10), `${year}-${month}-19`),
            day20: this.checkRemote(sk[0].day20, parseInt(e.code, 10), `${year}-${month}-20`),
            day21: this.checkRemote(sk[0].day21, parseInt(e.code, 10), `${year}-${month}-21`),
            day22: this.checkRemote(sk[0].day22, parseInt(e.code, 10), `${year}-${month}-22`),
            day23: this.checkRemote(sk[0].day23, parseInt(e.code, 10), `${year}-${month}-23`),
            day24: this.checkRemote(sk[0].day24, parseInt(e.code, 10), `${year}-${month}-24`),
            day25: this.checkRemote(sk[0].day25, parseInt(e.code, 10), `${year}-${month}-25`),
            day26: this.checkRemote(sk[0].day26, parseInt(e.code, 10), `${year}-${month}-26`),
            day27: this.checkRemote(sk[0].day27, parseInt(e.code, 10), `${year}-${month}-27`),
            day28: this.checkRemote(sk[0].day28, parseInt(e.code, 10), `${year}-${month}-28`),
            day29: this.checkRemote(sk[0].day29, parseInt(e.code, 10), `${year}-${month}-29`),
            day30: this.checkRemote(sk[0].day30, parseInt(e.code, 10), `${year}-${month}-30`),
            day31: this.checkRemote(sk[0].day31, parseInt(e.code, 10), `${year}-${month}-31`),
          }
        } else {
          return {
            personal_number: parseInt(e.code, 10),
            fullName: e.description,
            day1: "",
            day2: "",
            day3: "",
            day4: "",
            day5: "",
            day6: "",
            day7: "",
            day8: "",
            day9: "",
            day10: "",
            day11: "",
            day12: "",
            day13: "",
            day14: "",
            day15: "",
            day16: "",
            day17: "",
            day18: "",
            day19: "",
            day20: "",
            day21: "",
            day22: "",
            day23: "",
            day24: "",
            day25: "",
            day26: "",
            day27: "",
            day28: "",
            day29: "",
            day30: "",
            day31: "",
          }
        }
      })
      return array
    }
  },
  computed: {
    ...mapGetters(["getEmployees", "getSKUDClients", "getOVPNClients", "getPPPClients"]),
    calcDurationWorkTime() {
      return this.ovpn_clients.map(vc => {
        return {
          ...vc,
          date: vc.timestamp.substring(0, 10),
          duration: this.toHHMM(vc.uptime)        
        }
      });
    },
    fillTableVPN() {
      const year = '2020'
      const month = '10'
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
