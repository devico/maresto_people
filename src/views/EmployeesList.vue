<template>
  <div>
    <Loader v-if="loading" class="mt-20"/>
  <div v-else flex class="mx-5">
    <v-row>
      <v-col cols="12" class="mt-3">
        <h2>Сотрудники</h2>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="2" v-if="onFilter">
      <FilterEmployees />
      </v-col>
      <v-col>
        <v-row class="m0 p0">
      <v-col cols="10"> </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-spacer></v-spacer>
        <v-btn icon @click.prevent="onFilter = !onFilter">
          <v-icon v-if="onFilter">mdi-filter</v-icon>
          <v-icon v-else>mdi-filter-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click.prevent="onDetail = false">
          <v-icon v-if="onDetail">mdi-account-arrow-right</v-icon>
          <v-icon v-else>mdi-account-arrow-right-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click.prevent="toGrid">
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
        <v-card-title text-xl-h4>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="employeesTable"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1 searchable sortable"
          @page-count="pageCount = $event"
          @click:row="showEmployeeDetail"
          :sort-by="['full_name']"
          :sort-desc="[false]"
        >
          <template #item.image="{item}">
            <v-avatar size="40">
              <img :src="require(`@/assets/images/${item.img}`)" />
            </v-avatar>
          </template>
          <template #item.full_name="{item}">
            {{ item.full_name }}
          </template>
          <template #item.position="{item}">
            {{item.position}}
          </template>
          <template #item.unit="{item}">
            <UnitDisplay :unit="item.unit" />
          </template>
          <template #item.phone="{item}">
            {{item.phone}}
          </template>
          <template #item.email="{item}">
            {{item.innerPhone}}
          </template>
          <template #item.work_place="{item}">
            <WorkPlaceDisplay :work_place="item.id" />
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="7"
            prev-icon="mdi-chevron-left"
            next-icon="mdi-chevron-right"
          ></v-pagination>
          <!-- <v-text-field
            :value="itemsPerPage"
            label="Элементов на странице"
            type="number"
            min="-1"
            max="15"
            @input="itemsPerPage = parseInt($event, 12)"
          ></v-text-field> -->
        </div>
      </v-col>
      <v-col cols="2" v-if="onDetail">
      <EmployeeDetail :id="employeeID"/>
      </v-col>
    </v-row>
  </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import { apiService } from "../common/api.service.js";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { Base64 } from "js-base64";
import UnitDisplay from "@/components/UnitDisplay";
import FilterEmployees from "@/components/FilterEmployees";
import EmployeeDetail from "@/components/employees/EmployeeDetail";

// import { mdiFilter } from '@mdi/js';
// import { mdiViewList } from '@mdi/js';
// import { mdiViewGrid } from '@mdi/js';
// import { mdiViewGridOutline } from '@mdi/js';
// import { mdiSortAscending } from '@mdi/js';
export default {
  components: {
    UnitDisplay,
    FilterEmployees,
    EmployeeDetail
  },
  data() {
    return {
      loading: true,
      onFilter: false,
      onDetail: false,
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
      employeeID: '',
      active_employees: [],
      dismissed_employees: [],
      resumes: []
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
    await this.fetchDismissed()
    await this.fetchResume()
    this.employees = await this.getEmployees;
    this.dismissed_employees = await this.getDismissed
    this.persons = await this.getPersons;
    this.units = await this.getUnits;
    this.positions = await this.getPositions;
    this.workPlaces = await this.getWorkPlaces;
    this.typesContact = await this.getTypesContact;
    this.contacts = await this.getContacts;
    this.buildEmployeesTable();
    this.loading = false
  },
  methods: {
    ...mapActions(["fetchEmployees", "fetchPersons", "fetchUnits", "fetchPositions", "fetchWorkPlaces", "fetchTypesContact", "fetchContacts", "fetchDismissed", "fetchResume"]),
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
      
      if (unt[0] == undefined) {
        return "Без подразделения";
      }
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
        const kind = this.typesContact.filter(k => {
          return c.kind == k.refKey
        })

        return kind[0].description == 'Мобильный корпоративный телефон'
      })
      
      if (phone[0] == undefined) {
        const phone1 = cnts.filter(c => {
          const kind = this.typesContact.filter(k => {
            return c.kind == k.refKey
          })
          
          return kind[0].description == 'Личный мобильный телефон'
        })
        if (phone1[0] !== undefined) {
          return phone1[0].description
        } else {
          return "Нет номера";
        }
      } else {
        return phone[0].description
      }
      
    },
    getInnerPhone(p_id) {
      const cnts = this.contacts.filter((c) => {
        return p_id == c.personKey
      });
      const phone = cnts.filter(c => {
        const kind = this.typesContact.filter(k => {
          return c.kind == k.refKey
        })

        return kind[0].description == 'Внутренний телефон'
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
        const kind = this.typesContact.filter(k => {
          return c.kind == k.refKey
        })
        // console.log('KN: ', kind[0].description)
        return kind[0].description == 'Корпоративная электронная почта'
      })
      if (email[0] == undefined) {
        return "Нет ящика";
      }
      return email[0].description      
    },
    showEmployeeDetail(item) {
      this.onDetail = false
      console.log('1 ID', this.onDetail)
      this.employeeID = item.id
      setTimeout(() => {
        this.onDetail = true
        console.log('2 ID', this.onDetail)
      }, 500)
      
      // this.$router.push(`/employee/${item.id}`)
    },
    toGrid() {
      // this.$router.push('/employees/grid')
    },
    buildEmployeesTable() {
      const actual = this.employees.filter((e) => {
        return !this.dismissed_employees.includes(e.refKey)
      })
      
      this.employeesTable = actual.map((e) => {
        return {
            id: e.refKey,
            img: this.getImage(e.personKey),
            full_name: e.description,
            position: this.getPosition(e.orgPosition),
            unit: this.getUnit(e.unitKey),
            phone: this.getPhone(e.personKey),
            innerPhone: this.getInnerPhone(e.personKey),          
            //email: this.getEmail(e.personKey)
          };
      });
    },
    imageSrc(img) {
      return require("@/assets/images/" + img);
    },
  },
  computed: {
    ...mapGetters(["getEmployees", "getPersons", "getUnits", "getPositions", "getWorkPlaces", "getTypesContact", "getContacts", "getDismissed", "getResumes"]),
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
        { text: 'Корпоративный(личный)', value: 'phone' },
        { text: 'Вн.телефон', value: 'innerPhone' }
      ];
    },
  },
};
</script>
<style scoped>

</style>
