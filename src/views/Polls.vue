<template>
  <div flex class="mx-15">
    <v-row>
      <v-col cols="12" class="mt-3">
        <h2>Анкетирование</h2>
      </v-col>
    </v-row>
<!--     <v-row align="center">
      <v-col cols="12" md="3">
        <v-card class="mb-5 ml-2" min-height="100">
          <v-list-item two-line subheader>
            <v-list-item-content>
              <v-list-item-title><h6>Стаж работы 1 год:</h6></v-list-item-title>
              <v-list-item-title><h6>19 человек</h6></v-list-item-title>
            </v-list-item-content>            
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="3">
        <v-card class="mb-5 ml-2" min-height="100">
          <v-list-item>
            <v-list-item-content v-on="on">
              <v-list-item-title><h6>Стаж работы от 1 года до 3 лет:</h6></v-list-item-title>
              <v-list-item-title><h6>57 человек</h6></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="3">
        <v-card class="mb-5 ml-2" min-height="100">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h6>Стаж работы от 3 до 5 лет:</h6></v-list-item-title>
              <v-list-item-title><h6>27 человек</h6></v-list-item-title>             
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="3">
        <v-card class="mb-5 ml-2" min-height="100">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h6>Стаж работы свыше 5 лет:</h6></v-list-item-title>
              <v-list-item-title><h6>45 человек</h6></v-list-item-title>             
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>  
    </v-row> -->
    
    
    <v-row flex >
      <v-col cols="10" class="mx-0 py-1" >
        <ChartWorkingCondition :series="seriesWorkingCondition" :chartOptions="chartOptionsWorkingCondition" />        
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ChartWorkingCondition from "./ChartWorkingCondition";

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ChartWorkingCondition,
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
      unitsWoman: [],
      unitsMan: [],
      series: [],
      unitsDismissEmps: [],
      baseDismiss: [],
      docsDismiss: [],
      baseDismissEmps: [],
      chartOptions: {
        chart: {
          width: 280,
          type: "pie",
          events: {
            click: function(event, chartContext, config) {
              // console.log('Ev: ', event)
              // console.log('chartContext: ', chartContext)
              // console.log('config: ', config)
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            }
          },
        },
        labels: ["Мужчины", "Женщины"],
        dataLabels: {
          enabled: true,
          formatter: function(value, { seriesIndex, dataPointIndex, w }) {
            return w.config.series[seriesIndex]
          },
          style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ["#000"]
          },

        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "top",
              },
            },
          },
        ],
      },
      chartOptionsCountEmpsByYear: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            colors: ['#000']
          }
        },
        xaxis: {
          axisBorder: {
            show: false,
          },
          categories: ['до 1 года', 'от 1 до 3', 'от 3 до 5', 'свыше 5'],          
        },
        yaxis: {
          labels: {
            show: false
          }
        }
        
      },
      chartOptionsDismissCountByUnit: {
        chart: {
          type: "bar",
          height: 280,
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
          style: {
            fontSize: '12px',
            colors: ['#000']
          }
        },
        yaxis: {
          reversed: true
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
        
      },
      chartOptionsWorkingCondition: {
        chart: {
          type: 'radar',
          toolbar: {
            show: false,
          },
        },
        title: {
          text: 'УСЛОВИЯ РАБОТЫ В КОМПАНИИ'
        },
        dataLabels: {
          enabled: true,
          background: {
            enabled: true,
            borderRadius:2,
          }
        },
        xaxis: {
          categories: [
            "Взаимодействие между подразделениями компании",
            "Взаимоотношения в коллективе",
            "Взаимоотношения с непосредственным руководителем",
            "Уровень заработной платы",
            "Ясность целей работы и критериев оценки труда",
            "Объективность оценки результатов труда ",
            "Возможность профессионального развития",
            "Возможность реализовать свой потенциал",
            "Комфортность условий работы",
            "Отношение к инициативам сотрудников",
            "Признание, уважение вложенного труда и заслуг"          
          ],
          labels: {
            show: true,
            style: {
              colors: ["#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000", "#000"],
              fontSize: "11px",
              fontFamily: 'Arial'
            }
          }
        },
      },
      seriesUnits: [
        {
          data: [],
        },
      ],
      seriesCountEmpsByYear: [
        {
          data: []
        }
      ],
      seriesDismissCountByUnit: [
        {
          data: []
        }
      ],
      seriesWorkingCondition: [{
        data: [1, 3, 2, 7, 2, 5, 6, 8, 1, 1, 6],
      }],
      chartOptionsUnits: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
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
          style: {
            fontSize: '12px',
            colors: ['#000']
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
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
    };
  },

  async mounted() {
    this.employees = await this.getEmployees;
    await this.fetchBaseDismiss()
    await this.fetchDocsDismiss()
    this.persons = await this.getPersons;
    this.recruitments = await this.fetchRecruitments()
    this.units = await this.getUnits;
    this.workPlaces = await this.getWorkPlaces;
    this.dismissed_employees = await this.getDismissed
    this.baseDismiss = await this.getBaseDismiss
    this.docsDismiss = await this.getDocsDismiss
    
    setTimeout(() => {
      this.getGenderForCharts();
      this.getUnitsForCharts();
    }, 500);
    this.getAverageAge
    this.getCountEmpsPerYear()
    this.getCountDismissUnits()
    this.getCountDismissBase()
  },
  methods: {
    ...mapActions(['fetchRecruitmentByID', 'fetchRecruitments', "fetchBaseDismiss", "fetchDocsDismiss"]),
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
          data: newData
        }
      ];
    },
    getUnitsForCharts() {
      const actual = this.employees.filter((e) => {
        return !this.dismissed_employees.includes(e.refKey)
      })

      this.units.map((u) => {
        let count = 0;
        let countMan = 0;
        let countWoman = 0;

        actual.map((e) => {
          if (e.unitKey == u.refKey) {
            count += 1;
            this.persons.map((p) => {
              if (e.personKey == p.refKey) {
                if (p.gender == "Женский") {
                  countWoman += 1;
                }
                if (p.gender == "Мужской") {
                  countMan += 1
                }
              }
            });
          }
          
        });
        this.unitsCount.push({ title: u.description, total: count, countMan: countMan, countWoman: countWoman });
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
      
      // const newDataUnit = this.unitsCount.map((uc) => {
      //   return uc.number;
      // });
      const newLabelsUnit = this.unitsCount.map((uc) => {
        return uc.title;
      });

       const newDataUnitMan = this.unitsCount.map((uc) => {
        return uc.countMan;
      });

       const newDataUnitWoman = this.unitsCount.map((uc) => {
        return uc.countWoman;
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
          name: 'Мужчины',
          data: newDataUnitMan,
        },
        {
          name: 'Женщины',
          data: newDataUnitWoman
        }
      ];
    },
    getCountEmpsPerYear() {
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

      const empsLessOne = recrs.filter(r => {
        const currentYear = 2020
        if (r.recrut !== 'Не указан') {
          const startWork = parseInt(r.recrut.substring(0,4))
          return currentYear - startWork == 0
        }
      })

      const empsOneThree = recrs.filter(r => {
        const currentYear = 2020
        if (r.recrut !== 'Не указан') {
          const startWork = parseInt(r.recrut.substring(0,4))
          return (currentYear - startWork >= 1 && currentYear - startWork < 3)
        }
      })

      const empsThreeFive = recrs.filter(r => {
        const currentYear = 2020
        if (r.recrut !== 'Не указан') {
          const startWork = parseInt(r.recrut.substring(0,4))
          return (currentYear - startWork >= 3 && currentYear - startWork < 5)
        }
      })

      const empsMoreFive = recrs.filter(r => {
        const currentYear = 2020
        if (r.recrut !== 'Не указан') {
          const startWork = parseInt(r.recrut.substring(0,4))
          return (currentYear - startWork >= 5)
        }
      })
      
      const countsYears = [empsLessOne.length, empsOneThree.length, empsThreeFive.length, empsMoreFive.length]

      // console.log('countsYears', countsYears)

      this.seriesCountEmpsByYear = [
        {
          name: "Сотрудников",
          data: countsYears,
        }
      ];

    },
    getCountDismissUnits() {
      const dismissEmps = this.employees.filter((e) => {
        return this.dismissed_employees.includes(e.refKey)
      })

      const unitsDismiss = this.units.filter(u => {
        let countDism = 0
        dismissEmps.map(de => {
          if (u.refKey == de.unitKey) {
            countDism += 1
          }
        })
        
        return countDism > 0
      })

      const dismissCountUnits = unitsDismiss.map(ud => {
        let countDism = 0
        dismissEmps.map(de => {
          if (ud.refKey == de.unitKey) {
            countDism += 1
          }
        })

        return {
          nameUnit: ud.description,
          countDismiss: countDism
        }
      })
      
      this.unitsDismissEmps = dismissCountUnits
      // const newLabelsUnit = dismissCountUnits.map((uc) => {
      //   return uc.nameUnit;
      // });

      //  const newDataUnit = dismissCountUnits.map((uc) => {
      //   return uc.countDismiss;
      // });
      
      // console.log('L: ', newLabelsUnit)
      // console.log('D: ', newDataUnit)
      
      // this.chartOptionsDismissCountByUnit = {
      //   xaxis: {
      //     categories: newLabelsUnit,
      //     labels: {
      //       show: false,
      //     },
      //     crosshairs: {
      //       show: false,
      //     },
      //   },
      // };

      // this.seriesDismissCountByUnit = [
      //   {
      //     data: newDataUnit,
      //   }
      // ];

    },
    getCountDismissBase() {
      const bases = this.baseDismiss.filter(b => {
        let countDism = 0
        this.docsDismiss.map(dd => {
          if (b.refKey == dd.reasonDismiss) {
            countDism += 1
          }
        })
        
        return countDism > 0
      })

      const dismissCountBase = bases.map(b => {
        let countDism = 0
        this.docsDismiss.map(de => {
          if (b.refKey == de.reasonDismiss) {
            countDism += 1
          }
        })

        return {
          nameReason: b.description,
          countReason: countDism
        }
      })
      
      this.baseDismissEmps = dismissCountBase
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
    ...mapGetters(["getEmployees", "getPersons", "getUnits", "getWorkPlaces", "getDismissed", "getBaseDismiss", "getDocsDismiss"]),
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
