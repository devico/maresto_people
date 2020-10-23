<template>
  <div flex class="mx-15">
    <v-row>
      <v-col cols="12">
        <h2>Главная</h2>
      </v-col>
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
// import { mdiFilter } from '@mdi/js';
// import { mdiViewList } from '@mdi/js';
// import { mdiViewGrid } from '@mdi/js';
// import { mdiViewGridOutline } from '@mdi/js';
// import { mdiSortAscending } from '@mdi/js';
export default {
  components: {
    UnitDisplay,
  },
  data() {
    return {
      user: {},
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      employees: [],
      persons: [],
      units: [],
      employeesTable: [],
      imagePath: "../assets/images/",
    };
  },
  async mounted() {
    await this.fetchEmployees();
    await this.fetchPersons();
    await this.fetchUnits();
    this.employees = await this.getEmployees;
    this.persons = await this.getPersons;
    this.units = await this.getUnits;
    this.buildEmployeesTable();
  },
  methods: {
    ...mapActions(["fetchEmployees", "fetchPersons", "fetchUnits"]),
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
      return `${img[0].image}.png`;
    },
    getUnit(u_id) {
      const unt = this.units.filter((u) => {
        return u_id == u.refKey;
      });
      return unt[0].description;
    },
    buildEmployeesTable() {
      this.employeesTable = this.employees.map((e) => {
        return {
          id: e.refKey,
          img: this.getImage(e.personKey),
          full_name: e.description,
          unit: this.getUnit(e.unitKey),
        };
      });
    },
    imageSrc(img) {
      return require("@/assets/images/" + img);
    },
  },
  computed: {
    ...mapGetters(["getEmployees", "getPersons", "getUnits"]),
    headers() {
      return [
        //{ text: '', value: 'image' },
        {
          text: "ФИО",
          align: "start",
          sortable: true,
          value: "full_name",
        },
        { text: "Подразделение", value: "unit" },
        // { text: 'Место работы', value: 'Место' }
      ];
    },
  },
};
</script>
<style scoped></style>
