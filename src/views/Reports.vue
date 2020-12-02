<template>
  <div flex class="mx-15">
    <v-row>
      <v-col cols="12" class="mt-3">
        <h2>Отчеты</h2>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3">
        <v-card class="mb-5 ml-2" min-height="100">
          <v-list-item two-line subheader>
            <v-list-item-content>
              <v-list-item-title><h6>Всего сотрудников:</h6></v-list-item-title>
              <v-list-item-title><h6>{{getEmployeesLessOneYear.total}} человек</h6></v-list-item-title>
            </v-list-item-content>            
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="3">
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
        <v-card class="mb-5 ml-2" min-height="100">
          
              <v-list-item>
                <v-list-item-content v-on="on">
                  <v-list-item-title><h6>Сотрудников, пришедших в 2020 году:</h6></v-list-item-title>
                  <v-list-item-title><h6>{{getEmployeesLessOneYear.countLessOneYear}} человек ({{getEmployeesLessOneYear.percentLessOneYear}} %)</h6></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              </v-card>         
            </template>
            <span v-for="item in getEmployeesLessOneYear.listEmployees" :key="item.refKey">
              <p>{{item.description}}</p>
            </span>
          </v-tooltip>          
        
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="3">
        <v-card class="mb-5 ml-2" min-height="100">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h6>Процент со стажем меньше 1 года:</h6></v-list-item-title>
              <v-list-item-title><h6>{{getEmployeesLessOneYear.percentLessOneYear}} %</h6></v-list-item-title>             
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="3">
        <v-card class="mb-5 ml-2" min-height="100">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h6>Средний возраст сотрудников:</h6></v-list-item-title>
              <v-list-item-title><h6>{{getAverageAge}} года</h6></v-list-item-title>             
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>  
    </v-row>
    
    <!-- <v-row>
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
    </v-row> -->
    <v-row flex>
      <v-col cols="4" class="mx-0 py-1">
        <v-card class="mx-auto rounded-card mt-5" width="100%" :elevation="6">
          <v-toolbar color="#2C3A47" flat>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title class="white--text">Гендерный профиль</v-toolbar-title>
            </v-col>
          </v-toolbar>
          <v-col class="d-flex justify-space-around">
            <ChartGender :series="series" :chartOptions="chartOptions" />
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="8" class="mx-0 py-1">
        <v-card class="mx-auto rounded-card mt-5" width="100%" :elevation="6">
          <v-toolbar color="#2C3A47" flat>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title class="white--text">Численность сотрудников по подразделениям</v-toolbar-title>
            </v-col>
          </v-toolbar>
          <v-col cols="10" class="flex-grow-0 flex-shrink-1">
            <ChartUnits :series="seriesUnits" :chartOptions="chartOptionsUnits" />
          </v-col>
          </v-card>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="4" class="mt-3">
        <h6>Гендерный профиль</h6>
        <ChartGender :series="series" :chartOptions="chartOptions" />
      </v-col>
    
      <v-col cols="8" class="mt-3">
        <h6>Численность сотрудников по подразделениям</h6>
        <ChartUnits :series="seriesUnits" :chartOptions="chartOptionsUnits" />
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import ChartGender from "./ChartGender";
import ChartUnits from "./ChartUnits";
import { mapGetters, mapActions } from "vuex";
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
      dismissed_employees: [],
      recruitments: [],
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
          offsetX: -20,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
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
        yaxis: {
          reversed: true
        },
      },
    };
  },

  async mounted() {
    this.employees = await this.getEmployees;
    this.persons = await this.getPersons;
    this.recruitments = await this.fetchRecruitments()
    this.units = await this.getUnits;
    this.workPlaces = await this.getWorkPlaces;
    this.dismissed_employees = await this.getDismissed
    
    setTimeout(() => {
      this.getGenderForCharts();
      this.getUnitsForCharts();
    }, 0);
    this.getAverageAge
  },
  methods: {
    ...mapActions(['fetchRecruitmentByID', 'fetchRecruitments']),
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
      const actual = this.employees.filter((e) => {
        return !this.dismissed_employees.includes(e.refKey)
      })

      this.units.map((u) => {
        let count = 0;
        actual.map((e) => {
          if (e.unitKey == u.refKey) {
            count += 1;
          }
        });
        this.unitsCount.push({ title: u.description, number: count });
      });

      // arr.sort(function(a, b) {
      //   if (a.title < b.title) return -1;
      //   if (a.title > b.title) return 1;
      //   return 0;
      // });
   
      this.unitsCount = this.unitsCount.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      
      const newDataUnit = this.unitsCount.map((uc) => {
        return uc.number;
      });
      const newLabelsUnit = this.unitsCount.map((uc) => {
        return uc.title;
      });
      

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
    getCountEmpsLessYear(recrs) {
      const lessOne = recrs.filter(r => {
        const currentYear = 2020
        if (r.recrut !== 'Не указан') {
          const startWork = parseInt(r.recrut.substring(0,4))
          return currentYear - startWork == 0
        }
      })
      // console.log('List', lessOne)

      return {
        countLessOneYear: lessOne.length,
        percentLessOneYear: (lessOne.length * 100 / recrs.length).toFixed(2),
        listEmployees: lessOne
      }
    },
  },
  watch: {},
  computed: {
    ...mapGetters(["getEmployees", "getPersons", "getUnits", "getWorkPlaces", "getDismissed"]),
    getEmployeesLessOneYear() {
      const actual = this.employees.filter((e) => {
        return !this.dismissed_employees.includes(e.refKey)
      })
      
      const recrs = actual.map(e => {
        const prs = this.recruitments.filter(r => {
          return r.ФизЛицо_Key == e.personKey
        })
        
        if (prs[0] !== undefined) {
          return {
            ...e,
            recrut: prs[0].Period
          } 
        } else {
          return {
            ...e,
            recrut: 'Не указан'
          } 
        }
               
      })

      const less = this.getCountEmpsLessYear(recrs)     

      return {
        total: recrs.length,
        countLessOneYear: less.countLessOneYear,
        percentLessOneYear: less.percentLessOneYear,
        listEmployees: less.listEmployees
      }
    },
    getAverageAge() {
      const actual = this.employees.filter((e) => {
        return !this.dismissed_employees.includes(e.refKey)
      })

      const currentYear = 2020

      const ages = actual.map(e => {
        const bds = this.persons.filter(p => {
          if (p.refKey == e.personKey) {
            if(p.birthday !== null) {
              return p.birthday
            }
            
          }     
        })

        if(bds[0] !== undefined) {
          return currentYear - parseInt(bds[0].birthday.substring(0,4))
        }
      })      
      
      const avgAge = ages.reduce((a, b) => {
        return (a += b)
      }, 0)
    
      return parseInt(avgAge / ages.length)
    }
  },
};
</script>
<style scoped></style>
