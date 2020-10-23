<template>
  <div flex class="mx-15">
    <v-row>
      <v-col cols="12" class="mt-3">
        <h2>Отчеты</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="py-2" align="center" justify="center">
        <v-btn-toggle
          v-model="typeChart"
          tile
          color="blue darken-1 accent-3"
          group
        >
          <v-btn value="gender">
            Гендерный профиль
          </v-btn>
          <v-btn value="units">
            Численность подразделений
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row d-flex>
      <v-col class="mt-3">
        <h6>Гендерный профиль</h6>
        <ChartGender :series="series" :chartOptions="chartOptions" />
      </v-col>
    
      <v-col class="mt-3">
        <h6>Численность подразделений</h6>
        <ChartUnits :series="seriesUnits" :chartOptions="chartOptionsUnits" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ChartGender from "./ChartGender";
import ChartUnits from "./ChartUnits";
import { mapGetters } from "vuex";
export default {
  components: {
    ChartGender,
    ChartUnits,
  },
  data() {
    return {
      typeChart: "gender",
      employees: [],
      persons: [],
      units: [],
      workPlaces: [],
      unitsCount: [],
      totalMan: 0,
      totalWoman: 0,
      man: [],
      woman: [],
      series: [
        {
          data: [50, 50],
        },
      ],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Мужчины", "Женщины"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      seriesUnits: [
        {
          name: "Сотрудников",
          data: [1, 2, 3, 4, 5],
        },
      ],
      chartOptionsUnits: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [
            "Филиал в г.Харьков",
            "Филиал в г.Запорожье",
            "Филиал в г.Одесса",
            "Филиал в г.Львов",
            "Отдел логистики",
          ],
        },
      },
    };
  },

  async mounted() {
    this.employees = await this.getEmployees;
    this.persons = await this.getPersons;
    this.units = await this.getUnits;
    this.workPlaces = await this.getWorkPlaces;
    setTimeout(() => {
      this.getGenderForCharts();
      this.getUnitsForCharts();
    }, 0);
  },
  methods: {
    getGenderForCharts() {
      this.employees.map((e) => {
        this.persons.map((p) => {
          if (e.personKey == p.refKey) {
            if (p.gender == "Женский") {
              this.woman.push(p.description);
            }
            if (p.gender == "Мужской") {
              this.man.push(p.description);
            }
          }
        });
      });
      const newData = [this.man.length, this.woman.length];
      this.series = [
        {
          data: newData,
        },
      ];
    },
    getUnitsForCharts() {
      this.units.map((u) => {
        let count = 0;
        this.employees.map((e) => {
          if (e.unitKey == u.refKey) {
            count += 1;
          }
        });
        this.unitsCount.push({ title: u.description, number: count });
      });
      // console.log('UCount', this.unitsCount)
      const newDataUnit = this.unitsCount.map((uc) => {
        return uc.number;
      });
      const newLabelsUnit = this.unitsCount.map((uc) => {
        return uc.title;
      });
      // console.log('UCount', newLabelsUnit)

      this.chartOptionsUnits = {
        xaxis: {
          categories: newLabelsUnit,
          labels: {
            show: false,
          },
          crosshairs: {
            show: false,
          },
        },
      };

      this.seriesUnits = [
        {
          data: newDataUnit,
        },
      ];
    },
  },
  watch: {},
  computed: {
    ...mapGetters(["getEmployees", "getPersons", "getUnits", "getWorkPlaces"]),
  },
};
</script>
<style scoped></style>
