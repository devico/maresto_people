<template>
  <div flex class="mx-15">
    <v-row>
      <v-col cols="12" class="mt-3">
        <h2>Календарь</h2>
      </v-col>
    </v-row>
    <Loader v-if="loading" />
    <v-row v-else class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Сегодня
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ kindToLabel[kind] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="showAll">
                  <v-list-item-title>Все</v-list-item-title>
                </v-list-item>
                <v-list-item @click="showGov">
                  <v-list-item-title>Государственные</v-list-item-title>
                </v-list-item>
                <v-list-item @click="showProf">
                  <v-list-item-title>Профессиональные</v-list-item-title>
                </v-list-item>
                <v-list-item @click="showBirthdays">
                  <v-list-item-title>Дни рождения</v-list-item-title>
                </v-list-item>
                <!-- <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item> -->
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>День</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Неделя</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Месяц</v-list-item-title>
                </v-list-item>
                <!-- <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item> -->
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            :kind="kind"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Отмена
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    loading: true,
    focus: "",
    type: "month",
    kind: 'all',
    typeToLabel: {
      month: "Месяц",
      week: "Неделя",
      day: "День",
      "4day": "4 Days",
    },
    kindToLabel: {
      all: "Все праздники",
      gov: "Государственные",
      prof: "Профессиональные",
      birthday: "Дни рождения",      
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    allEvents: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Втреча",
      "Праздник",
      "PTO",
      "Путешествие",
      "Мероприятие",
      "День рождения",
      "Конференция",
      "Вечеринка",
    ],
    typesHoliday: [],
    holidays: [],
    employees: [],
    dismissed_employees: [],
    persons: [],
  }),
  async mounted() {
    await this.fetchEmployees();
    await this.fetchPersons();
    await this.fetchDismissed()
    await this.fetchTypesHoliday();
    await this.fetchHolidays();
    this.employees = await this.getEmployees;
    this.dismissed_employees = await this.getDismissed
    this.persons = await this.getPersons;
    this.typesHoliday = await this.getTypesHoliday;
    this.holidays = await this.getHolidays;
    this.loading = false
    this.getEmployeesBirthday()
  },
  methods: {
    ...mapActions(["fetchHolidays", "fetchTypesHoliday", "fetchEmployees", "fetchPersons", "fetchDismissed"]),
    showAll() {
      this.kind = 'all'
      
      this.events = this.allEvents
    },
    showGov() {
      this.kind = 'gov'
      const govEvents = this.allEvents.filter(e => {
        return e.kindHoliday == this.kind
      })
      this.events = govEvents
    },
    showProf() {
      this.kind = 'prof'
      const profEvents = this.allEvents.filter(e => {
        return e.kindHoliday == 'prof'
      })
      this.events = profEvents
    },
    showBirthdays() {
      this.kind = 'birthday'
      const birthdays = this.allEvents.filter(e => {
        return e.kindHoliday == this.kind
      })
      this.events = birthdays
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.kind == 'all' 
        ? this.showAll()
        : this.kind == 'gov'
        ? this.showGov()
        : this.kind == 'prof'
        ? this.showProf()
        : this.showBirthdays()
      this.$refs.calendar.prev();     
      
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];
      let currentTime = new Date()
      let year = currentTime.getFullYear()
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;

      this.holidays.map((h) => {
        events.push({
          name: this.getDescriptionHoliday(h.typeHoliday),
          start: new Date(`${h.date}T00:00:00`),
          end: new Date(`${h.date}T23:59:59`),
          color: h.kindHoliday == "gov"
              ? "green darken-1"
              : h.kindHoliday == "prof"
              ? "indigo"
              : "orange",
          kindHoliday: h.kindHoliday
        });
      });

      const actual = this.employees.filter((e) => {
        return !this.dismissed_employees.includes(e.refKey)
      })
      
      actual.map(e => {
        const persona = this.persons.filter(p => {
          return e.personKey == p.refKey
        })

        events.push({
          name: `ДР: ${e.description}`,
          start: new Date(`${year}-${persona[0].birthday.substring(5, 10)}T00:00:00`),
          end: new Date(`${year}-${persona[0].birthday.substring(5, 10)}T23:59:59`),
          color: 'red',
          kindHoliday: 'birthday'
        });

      })

      this.allEvents = events
      if (this.kind !== 'all') {
        const evnts = this.allEvents.filter(e => {
          return e.kindHoliday == this.kind
        })
        this.events = evnts
      } else {
        this.events = events;
      }
      
    },
    getDescriptionHoliday(holiday) {
      const hld = this.typesHoliday.filter((th) => {
        return th.refKey == holiday;
      });
      if (hld[0] == undefined) {
        
        return 'Без описания';
      }
      
      return hld[0].description
    },
    getEmployeesBirthday() {
      // let events = []
      // let currentTime = new Date()
      // let year = currentTime.getFullYear()

      // const actual = this.employees.filter((e) => {
      //   return !this.dismissed_employees.includes(e.refKey)
      // })
      
      // actual.map(e => {
      //   const persona = this.persons.filter(p => {
      //     return e.personKey == p.refKey
      //   })

      //   events.push({
      //     name: `ДР: ${e.description}`,
      //     start: new Date(`${year}-${persona[0].birthday.substring(5, 10)}T00:00:00`),
      //     end: new Date(`${year}-${persona[0].birthday.substring(5, 10)}T23:59:59`),
      //     color: 'red',
      //     kindHoliday: 'birthday'
      //   });

      // })
      
      // this.employeesTable = actual.map((e) => {
      //   return {
      //       id: e.refKey,
      //       img: this.getImage(e.personKey),
      //       full_name: e.description,
      //       position: this.getPosition(e.orgPosition),
      //       unit: this.getUnit(e.unitKey),
      //       phone: this.getPhone(e.personKey),
      //       innerPhone: this.getInnerPhone(e.personKey),            
      //     };
      // });
    }
  },
  computed: {
    ...mapGetters(["getTypesHoliday", "getHolidays", "getPersons", "getEmployees", "getDismissed"]),
    
  },
  
};
</script>
