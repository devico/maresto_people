<template>
  <div flex class="mx-15">
    <v-row>
      <v-col cols="12" class="mt-3">
        <h2>Сотрудники</h2>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="10"> </v-col>
      <v-col cols="2" class="d-flex justify-end mb-6 mt-3">
        <v-spacer></v-spacer>
        <v-btn icon @click.prevent="onFilter = !onFilter">
          <v-icon v-if="onFilter">mdi-filter</v-icon>
          <v-icon v-else>mdi-filter-outline</v-icon>
          
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click.prevent="onGrid = !onGrid">
          <v-icon v-if="onGrid">mdi-view-grid</v-icon>
          <v-icon v-else>mdi-view-grid-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon right @click.prevent="onList = !onList">
          <v-icon v-if="onList">mdi-view-list</v-icon>
          <v-icon v-else>mdi-view-list-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
    <v-row dense>
      
        <v-flex xs12 sm6 md4 lg3 v-for="employee in employeesTable" :key="employee.refKey">
          <v-card class="mx-auto mt-3" width="100%" :elevation="6">
            <v-responsive>
                <v-avatar size="177" class="mt-2">
                <v-img
                  class="mr-3"
                  :src="require(`@/assets/images/${employee.img}`)"
                  height="177"
                ></v-img>
              </v-avatar>
              </v-responsive>
            <v-card-text class="text-center">
              <p class="my-2 subtitle-1"><v-icon class="mr-3">mdi-briefcase-variant</v-icon>Должность</p>
              <p class="my-2 subtitle-1"><v-icon class="mr-3">mdi-office-building-marker</v-icon>Место работы</p>
              
            </v-card-text>
            <v-card-title class="justify-center">{{employee.description}}</v-card-title>
            <!-- <v-card-text>
              <p class="my-2 subtitle-1"><v-icon class="mr-3">mdi-briefcase-variant</v-icon>{{getPosition}}</p>
              <p class="my-2 subtitle-1"><v-icon class="mr-3">mdi-office-building-marker</v-icon>{{getWorkPlace}}</p>
            </v-card-text> -->
          </v-card>
        </v-flex>
      
    </v-row>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import { apiService } from "../common/api.service.js";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { Base64 } from "js-base64";
import UnitDisplay from "../components/UnitDisplay";
import FilterEmployees from "../components/FilterEmployees";

// import { mdiFilter } from '@mdi/js';
// import { mdiViewList } from '@mdi/js';
// import { mdiViewGrid } from '@mdi/js';
// import { mdiViewGridOutline } from '@mdi/js';
// import { mdiSortAscending } from '@mdi/js';
export default {
  components: {
    UnitDisplay,
    FilterEmployees
  },
  data() {
    return {
      onFilter: false,
      onGrid: false,
      onList: true,
      user: {},
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 12,
      employees: [],
      persons: [],
      units: [],
      positions: [],
      workPlaces: [],
      typesContact: [],
      contacts: [],
      employeesTable: [],
      imagePath: "../assets/images/",
    };
  },
  async mounted() {
    await this.fetchEmployees();
    await this.fetchPersons();
    await this.fetchUnits();
    await this.fetchPositions();
    await this.fetchWorkPlaces();
    await this.fetchTypesContact();
    await this.fetchContacts();
    this.employees = await this.getEmployees;
    this.persons = await this.getPersons;
    this.units = await this.getUnits;
    this.positions = await this.getPositions;
    this.workPlaces = await this.getWorkPlaces;
    this.typesContact = await this.getTypesContact;
    this.contacts = await this.getContacts;
    this.buildEmployeesTable();
    
  },
  methods: {
    ...mapActions(["fetchEmployees", "fetchPersons", "fetchUnits", "fetchPositions", "fetchWorkPlaces", "fetchTypesContact", "fetchContacts"]),
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
    getImage(p_id) {
      const img = this.persons.filter((p) => {
        return p_id == p.refKey;
      });
      if (img[0].image == "00000000-0000-0000-0000-000000000000") {
        return "noname.png";
      }
      return `${img[0].image}`;
    },
    getUnit(u_id) {
      const unt = this.units.filter((u) => {
        return u_id == u.refKey;
      });
      return unt[0].description;
    },
    getPosition(p_id) {
      const pst = this.positions.filter((p) => {
        return p_id == p.refKey;
      });
      if (pst[0] == undefined) {
        return "Без должности";
      }
      return pst[0].description;
    },
    getPhone(p_id) {
      const cnts = this.contacts.filter((c) => {
        return p_id == c.personKey
      });
      const phone = cnts.filter(c => {
        return c.type == 'Телефон'
      })
      if (phone[0] == undefined) {
        return "Нет номера";
      }
      return phone[0].description      
    },
    getEmail(p_id) {
      const cnts = this.contacts.filter((c) => {
        return p_id == c.personKey
      });
      const email = cnts.filter(c => {
        return c.type == 'АдресЭлектроннойПочты'
      })
      if (email[0] == undefined) {
        return "Нет ящика";
      }
      return email[0].description      
    },
    showEmployeeDetail(item) {
      this.$router.push(`/employee/${item.id}`)
    },
    buildEmployeesTable() {
      this.employeesTable = this.employees.map((e) => {
        return {
          id: e.refKey,
          img: this.getImage(e.personKey),
          full_name: e.description,
          position: this.getPosition(e.orgPosition),
          unit: this.getUnit(e.unitKey),
          phone: this.getPhone(e.personKey),
          email: this.getEmail(e.personKey)
        };
      });
    },
    imageSrc(img) {
      return require("@/assets/images/" + img);
    },
  },
  computed: {
    ...mapGetters(["getEmployees", "getPersons", "getUnits", "getPositions", "getWorkPlaces", "getTypesContact", "getContacts"]),
    headers() {
      return [
        { text: "", value: "image", width: "50px" },
        {
          text: "ФИО",
          align: "start",
          sortable: true,
          value: "full_name",
          width: "300px",
        },
        { text: "Должность", value: "position" },
        { text: "Подразделение", value: "unit" },
        { text: 'Телефон', value: 'phone' },
        { text: 'Email', value: 'email' }
      ];
    },
  },
};
</script>
<style scoped>

</style>
