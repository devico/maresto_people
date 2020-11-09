<template>
  <div>
    <v-sheet tile height="64" color="grey lighten-3" class="d-flex">
      <v-toolbar flat color="white">
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: ["employee"],
  data: () => ({
    type: "month",
    types: ["month"],
    mode: "stack",
    modes: ["stack"],
    weekday: [1, 2, 3, 4, 5, 6, 0],
    weekdays: [
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      // { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      // { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      // { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    colors: ["blue", "indigo", "deep-purple", "cyan", "green", "orange"],
    names: ["В офисе", "На удаленке", "Отпуск", "Командировка", "Другое"],
    start: "2020-10-01",
    end: "2020-10-31",
  }),
  mounted() {
    // console.log('Emp: ', this.employee)
  },
  methods: {
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getEvents({ start, end }) {
      const events = [];
      //console.log('New ', new Date())
      const min = new Date("2020-10-01T00:00:00");
      const max = new Date(`2020-10-31T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;

      const eventCount = this.rnd(days, days + 20);
      // console.log("Days: ", eventCount);

      for (const [key, value] of Object.entries(this.employee)) {
        const allDay = this.rnd(0, 3) === 0;
        const holidays = [
          "day3",
          "day4",
          "day10",
          "day11",
          "day14",
          "day17",
          "day18",
          "day24",
          "day25",
          "day31",
        ];
        if (`${key}`.startsWith("day")) {
          // console.log(`${key}`);
          const day =
            `${key.substring(3).length}` == 1
              ? `0${key.substring(3)}`
              : `${key.substring(3)}`;
          // console.log("DAY: ", day);
          events.push({
            name: holidays.includes(`${key}`)
              ? "Выходной"
              :`${value}`.startsWith("#") && `${value}` !== "#0"
              ? `${value.substring(1)} На удаленке`
              : `${value}`.startsWith("*")
              ? `${value.substring(1)} В офисе`
              : "Другое",
            start: new Date(`2020-10-${day}T00:00:00`),
            end: new Date(`2020-10-${day}T23:59:59`),
            color:  holidays.includes(`${key}`)
              ? "grey darken-1"
              : `${value}`.startsWith("#") && `${value}` !== "#0"
              ? "indigo"
              : `${value}`.startsWith("*")
              ? "green"
              : "orange",
            //timed: !allDay,
          });
        }
        // console.log(`${key}: ${value}`);
      }

      // console.log('events: ', events);

      // events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: !allDay,
      //   });
      // const days = this.employee.map(e => {
      //   console.log('Item', e)
      // })

      // const min = new Date(`${start.date}T00:00:00`);
      // const max = new Date(`${end.date}T23:59:59`);
      // const days = (max.getTime() - min.getTime()) / 86400000;
      // const eventCount = this.rnd(days, days + 20);

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0;
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //   const second = new Date(first.getTime() + secondTimestamp);

      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: !allDay,
      //   });
      // }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
