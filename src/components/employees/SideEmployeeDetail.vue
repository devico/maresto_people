<template>
    <div>
      <Loader v-if="loading" class="mt-20" />
    <v-row v-else flex>
      <v-card class="mx-auto ml-3 mt-3" width="100%" :elevation="1">
        <v-card-text class="text-center">
          <v-avatar size="100" class="mt-2">
            <v-img
              class="mr-3"
              :src="require(`@/assets/images/${person.image}`)"
              height="100"
            ></v-img>
          </v-avatar>
        </v-card-text>
        <v-card-text class="justify-center subtitle-1 indigo--text"><strong>{{
          person.description}}</strong>
        </v-card-text>
        <v-card-text>
          <p class="my-2 subtitle-0">
            <v-icon class="mr-3">mdi-briefcase-variant</v-icon>{{ getPosition }}
          </p>
          <p class="my-2 subtitle-0">
            <v-icon class="mr-3">mdi-office-building-marker</v-icon>{{ getWorkPlace }}
          </p>
        </v-card-text>
        <v-expansion-panels v-model="panel" multiple flat class="ml-2">
          <v-expansion-panel>
          <v-expansion-panel-header class="py-0 px-2 indigo--text">
            Документы
          </v-expansion-panel-header>

          <v-expansion-panel-content align-self-center>
            <!-- <v-btn
            class="mt-2"
              depressed
              small
              color="primary"
              @click="saveResume"
            >Скачать резюме
            </v-btn> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="py-0 px-2 indigo--text">
                Контакты                
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <Individual
                  :homePlace="getHomePlace"
                  :phone="getPhone"
                  :email="getEmail"
                  :birthday="getBirthday"
                />
              </v-expansion-panel-content>              
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="py-0 px-2 indigo--text">
                Работа
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <Work
                  :unit="getUnit"
                  :orgPosition="getPosition"
                  :workPlace="getWorkPlace"
                  :recruitment="recruitment[0] !== undefined ? recruitment[0].Period.substring(0, 10) : 'Не указано'"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="py-0 px-2 indigo--text">
                Образование
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <Education :educations="educations"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
             <v-expansion-panel>
              <v-expansion-panel-header class="py-0 px-2 indigo--text">
                Родственники
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <Family :relatives="relatives" />
              </v-expansion-panel-content> 
            </v-expansion-panel>
          </v-expansion-panels>
      </v-card>

    </v-row>
    </div>
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Individual from "@/components/Individual.vue";
import Work from "@/components/Work.vue";
import Education from "@/components/Education.vue";
import Family from "@/components/Family.vue";
import { Base64 } from 'js-base64';
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
      panel: [],
      employee: {},
      person: [],
      personImage: "",
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
    };
  },
  methods: {
    ...mapActions([
      "fetchEmployeeByID",
      "fetchPersonByID",
      "fetchRecruitmentByID",
      "fetchSpecialities",
      "fetchTypeEducation",
      "fetchSchools",
      "fetchRelationDegree",
    ]),
    saveResume() {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/octet-stream",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        responseType: 'blob',
        withCredentials: true,
        credentials: 'same-origin',
      };
      fetch("http://localhost:8080/ZUP/odata/standard.odata/Catalog_ХранилищеДополнительнойИнформации(guid eq '55f1bed5-e84a-11ea-bf40-000c29a7d70a')/Хранилище", config)
      .then(response => {
        return response;
      })
      .then((response) => {
        let blob = new Blob([response.data],{ type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'})
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = '222.docx'
        link.click();
      });
    },
  },
  computed: {
    ...mapGetters([
      "getPositions",
      "getWorkPlaces",
      "getTypesContact",
      "getContacts",
      "getEmployees",
      "getUnits",
    ]),
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
      const unt = this.units.filter((u) => {
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
        return this.person.refKey == c.personKey;
      });
      const homePlace = cnts.filter((c) => {
        return c.type == "Адрес";
      });
      if (homePlace[0] == undefined) {
        return "Не заполнено";
      }
      return homePlace[0].description;
    },
    getPhone() {
      const cnts = this.contacts.filter((c) => {
        return this.person.refKey == c.personKey;
      });
      const phone = cnts.filter((c) => {
        return c.type == "Телефон";
      });
      if (phone[0] == undefined) {
        return "Нет номера";
      }
      return phone[0].description;
    },
    getEmail() {
      const cnts = this.contacts.filter((c) => {
        return this.person.refKey == c.personKey;
      });
      const email = cnts.filter((c) => {
        return c.type == "АдресЭлектроннойПочты";
      });
      if (email[0] == undefined) {
        return "Нет ящика";
      }
      return email[0].description;
    },
    getBirthday() {
      const yy = this.person.birthday.substring(0, 4);
      const mm = this.person.birthday.substring(5, 7);
      const dd = this.person.birthday.substring(8, 10);
      
      return `${dd}.${mm}.${yy}`
    },
    getStartWork() {
      const emp = this.employees.filter((e) => {
        return this.person.refKey == e.personKey;
      });

      if (emp[0] == undefined || emp[0].startWork == "0001-01-01T00:00:00") {
        return "Не записано";
      }
      return emp[0].startWork;
    },
    backToEmployees() {
      this.$router.push("/employees");
    },
  },
  async mounted() {
    await this.fetchSpecialities();
    await this.fetchTypeEducation();
    await this.fetchSchools();
    await this.fetchRelationDegree();
    this.employee = await this.fetchEmployeeByID(this.id);
    this.person = await this.fetchPersonByID(this.employee.personKey);
    this.recruitment = await this.fetchRecruitmentByID(this.employee.personKey);
    this.employees = await this.getEmployees;
    this.positions = await this.getPositions;
    this.workPlaces = await this.getWorkPlaces;
    this.typesContact = await this.getTypesContact;
    this.contacts = await this.getContacts;
    this.units = await this.getUnits;
    this.educations = this.person.education;
    this.relatives = this.person.family;
    this.loading = false
    
  },
};
</script>

<style scoped></style>
