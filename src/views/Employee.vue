<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else flex class="ml-5 mr-15">
      <!-- <v-row>
        <v-col cols="12" class="mt-3">
          <v-row>
            <v-btn x-large icon right tile class="ml-2" @click.prevent="backToEmployees">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span class="mt-2 ml-5"><h2>Сотрудники</h2></span>
          </v-row>
        </v-col>
      </v-row> -->
      <v-row align="center" justify="center">
        <v-col cols="1">
          <v-row  width="50">
            <v-btn x-large icon right tile class="ml-5" @click.prevent="backToEmployees">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="3" class="mt-1">
          <v-row flex>
            <v-card class="mx-auto" width="100%" :elevation="6"  height="875">
              <v-card-text class="text-center">
                <v-avatar size="177" class="mt-2">
                  <v-img
                    class="mr-3"
                    :src="require(`@/assets/images/${person.image}`)"
                    height="177"
                  ></v-img>
                </v-avatar>
              </v-card-text>
              <v-card-title class="justify-center py-0">{{getLastName}}</v-card-title>
              <v-card-title class="justify-center py-0">{{getFirstName}}</v-card-title>
              <v-card-title class="justify-center py-0">{{getFathersName}}</v-card-title>
              <v-card-text>
                <p class="my-2 subtitle-1"><v-icon class="mr-3">mdi-briefcase-variant</v-icon>{{getPosition}}</p>
                <p class="my-2 subtitle-1"><v-icon class="mr-3">mdi-office-building-marker</v-icon>{{getWorkPlace}}</p>
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="8" class="pl-7 my-0">
          <v-row flex>
            <v-col cols="6" class="mx-0 py-1">
              <v-card class="mx-auto" width="100%" :elevation="6" height="265">
                <v-card-title class="justify-start">ЛИЧНОЕ</v-card-title>
                <Individual
                  :homePlace="getHomePlace"
                  :phone="getPhone"
                  :email="getEmail"
                  :birthday="getBirthday"
                />
              </v-card>
            </v-col>
            <v-col cols="6" class="mx-0  py-1">
              <v-card class="mx-auto" width="100%" :elevation="6" height="265">
                <v-card-title class="justify-start">РАБОТА</v-card-title>
                  <Work
                    :unit="getUnit"
                    :orgPosition="getPosition"
                    :workPlace="getWorkPlace"
                    :chief="getChiefOfPerson"
                    :recruitment="recruitment[0] !== undefined ? recruitment[0].Period.substring(0, 10) : 'Не указано'"
                  />
                </v-card>
            </v-col>
          </v-row>
          <v-row flex>
            <v-col cols="6" class="mx-0 py-1">
              <v-card class="mx-auto" width="100%" :elevation="6" height="485">
                <v-card-title class="justify-start">ОБРАЗОВАНИЕ</v-card-title>
                <Education :educations="educations"/>
              </v-card>
            </v-col>
            <v-col cols="6" class="mx-0 py-1">
              <v-card class="mx-auto" width="100%" :elevation="6" height="485">
                <v-card-title class="justify-start">РОДСТВЕННИКИ</v-card-title>
                  <Family :relatives="relatives" />
                </v-card>
            </v-col>
          </v-row>
          <v-row flex>
            <v-col cols="12" class="mx-0  py-1">
              <v-card class="mx-auto" width="100%" :elevation="6" height="110">
                <v-card-title class="justify-start">Документы</v-card-title>
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Показать Резюме</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <vue-markdown>{{person.comment}}</vue-markdown>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Individual from "@/components/Individual.vue";
import Work from "@/components/Work.vue";
import Education from "@/components/Education.vue";
import Family from "@/components/Family.vue";
export default {
  name: "Employee",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Individual,
    Work,
    Education,
    Family,
  },
  data() {
    return {
      loading: true,
      employee: {},
      person: [],
      personImage: '',
      individuals: [],
      workPlaces: [],
      units: [],
      orgPositions: [],
      organizations: [],
      contacts: [],
      typesContacts: [],
      families: [],
      relatives: [],
      degreesAffinities: [],
      typesEducations: [],
      educationSchools: [],
      specialities: [],
      positions: [],
      workPlaces: [],
      typesContact: [],
      contacts: [],
      employees: [],
      tab: null,
      units: [],
      recruitment: {},
      educations: [],
      relatives: [],
      typesObjects: [],
      valueTypesObjects: [],
    };
  },
  methods: {
    ...mapActions(['fetchEmployeeByID', 'fetchPersonByID', 'fetchRecruitmentByID', 'fetchSpecialities', 'fetchTypeEducation', 'fetchSchools', 'fetchRelationDegree', 'fetchTypesObjects', 'fetchValuesTypesObjects']),      
    
  },
  computed: {
    ...mapGetters([ "getPositions", "getWorkPlaces", "getTypesContact", "getContacts", "getEmployees", 'getUnits', 'getTypesObjects', 'getValueTypesObjects']),
    getFirstName() {
      const names = this.person.description.split(' ')
      return names[1]
    },
    getLastName() {
      const names = this.person.description.split(' ')
      return names[0]
    },
    getFathersName() {
      const names = this.person.description.split(' ')
      return names[2]
    },
    getPosition() {
      const emp = this.employees.filter((e) => {
        return this.person.refKey == e.personKey;
      });
      const pst = this.positions.filter((p) => {
        return emp[0].orgPosition == p.refKey;
      });
      
      if (pst[0] == undefined) {
        return "Без должности";
      }
      return pst[0].description;
    },
    getUnit() {
      const emp = this.employees.filter((e) => {
        return this.person.refKey == e.personKey;
      });
      const unt = this.units.filter(u => {
        return emp[0].unitKey == u.refKey;
      });
      
      if (unt[0] == undefined) {
        return "Не заполнено";
      }
      return unt[0].description;
    },
    getWorkPlace() {
      const emp = this.employees.filter((e) => {
        return this.person.refKey == e.personKey;
      });
      const wp = this.workPlaces.filter((wp) => {
        return emp[0].workPlace == wp.refKey;
      });
      
      if (wp[0] == undefined) {
        return "Без места";
      }
      return wp[0].description;
    },
    getHomePlace() {
      const cnts = this.contacts.filter((c) => {
        return this.person.refKey == c.personKey
      });
      const homePlace = cnts.filter(c => {
        return c.type == 'Адрес'
      })
      if (homePlace[0] == undefined) {
        return "Не заполнено";
      }
      return homePlace[0].description  
    },
    getPhone() {
      const cnts = this.contacts.filter((c) => {
        return this.person.refKey == c.personKey
      });
      const phone = cnts.filter(c => {
        return c.type == 'Телефон'
      })
      if (phone[0] == undefined) {
        return "Нет номера";
      }
      return phone[0].description      
    },
    getEmail() {
      const cnts = this.contacts.filter((c) => {
        return this.person.refKey == c.personKey
      });
      const email = cnts.filter(c => {
        return c.type == 'АдресЭлектроннойПочты'
      })
      if (email[0] == undefined) {
        return "Нет ящика";
      }
      return email[0].description      
    },
    getBirthday() {
      const yy = this.person.birthday.substring(0, 4)
      const mm = this.person.birthday.substring(5, 7)
      const dd = this.person.birthday.substring(8, 10)
      const birthday = `${dd}.${mm}.${yy}`

      return birthday
    },
    getStartWork() {
      const emp = this.employees.filter((e) => {
        return this.person.refKey == e.personKey;
      });
      
      if (emp[0] == undefined || emp[0].startWork == '0001-01-01T00:00:00') {
        return "Не записано";
      }
      return emp[0].startWork;
    },
    backToEmployees() {
      this.$router.push('/employees')
    },
    getChiefOfPerson() {
      const values = this.valueTypesObjects.filter((v) => {
        return this.employee.refKey == v.personKey
      });
      
      const chief = this.employees.filter(e => {
        const type = this.typesObjects.filter(t => {
          return t.description == 'Руководитель'
        });
        
        if (values[0] !== undefined) {
          if (values[0].propertyKey == type[0].refKey) {
            return e.refKey == values[0].value
          }
        }        
      })
      
      if (chief[0] == undefined) {
        return 'Не указан'
      }
      return chief[0].description
    },
  },
  async mounted() {
    this.employee = await this.fetchEmployeeByID(this.id);
    this.person = await this.fetchPersonByID(this.employee.personKey);
    this.recruitment = await this.fetchRecruitmentByID(this.employee.personKey);
    this.employees = await this.getEmployees;
    this.positions = await this.getPositions;
    this.workPlaces = await this.getWorkPlaces;
    this.typesContact = await this.getTypesContact;
    this.contacts = await this.getContacts;   
    this.units = await this.getUnits;
    
    await this.fetchSpecialities()
    await this.fetchTypeEducation()
    await this.fetchSchools()
    await this.fetchRelationDegree()
    await this.fetchTypesObjects()
    await this.fetchValuesTypesObjects()
    this.educations = this.person.education
    this.relatives = this.person.family
    this.typesObjects = await this.getTypesObjects
    this.valueTypesObjects = await this.getValueTypesObjects
    this.getChiefOfPerson
    this.loading = false
  }
};
</script>

<style scoped></style>
