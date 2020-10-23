<template>
  <v-container class="grey lighten-5">

    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="3" class="pl-10">
            <v-avatar size="177">
              <v-img
                class="mr-3"
                :src="require(`../assets/images/${person.image}`)"
                height="177"
              ></v-img>
            </v-avatar>
            
          </v-col>
          <v-col cols="9">
            <v-card class="pa-2" :elevation="6" height="200px">
              <h3>{{ person.description }}</h3>
              <hr />
              <!-- <OrgPosition
                v-for="(orgPosition, index) in orgPositions"
                :orgPosition="orgPosition"
                :key="index"
              /> -->
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card height="500px" :elevation="6">
          <v-tabs v-model="tab" background-color="transparent" grow>
            <v-tab><h6>Личное</h6></v-tab>
            <v-tab><h6>Работа</h6></v-tab>
            <v-tab><h6>Образование</h6></v-tab>
            <v-tab><h6>Контакты</h6></v-tab>
            <v-tab><h6>Родственники</h6></v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat class="mx-6 mt-3">
                <!-- <Individual
                  v-for="(individual, index) in individuals"
                  :individual="individual"
                  :key="index"
                /> -->
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat class="mx-6 mt-3">
                <!-- <Organization
                  v-for="(organization, index) in organizations"
                  :organization="organization"
                  :key="index"
                /> -->
              </v-card>
              <v-card flat class="mx-6 mt-3">
                <!-- <WorkPlace
                  v-for="(work, index) in workPlaces"
                  :workPlace="work"
                  :key="index"
                /> -->
              </v-card>
              <v-card flat class="mx-6 mt-3">
                <!-- <Unit
                  v-for="(unit, index) in units"
                  :unit="unit"
                  :key="index"
                /> -->
              </v-card>
              <v-card flat class="mx-6 mt-3">
                <!-- <OrgPosition
                  v-for="(orgPosition, index) in orgPositions"
                  :orgPosition="orgPosition"
                  :key="index"
                /> -->
              </v-card>
              <v-card flat class="mx-6 mt-3">
                <!-- <span>
                  <strong>Дата приема на работу:</strong>
                  <p>{{ employee.employment_date }}</p>
                </span> -->
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat class="mx-6 mt-3">
                <!-- <TypesEducation :typesEducations="typesEducations" />
                <EducationSchools :educationSchools="educationSchools" />
                <Specialities :specialities="specialities" />
                <span>
                  <strong>Диплом:</strong>
                  <p>{{ individuals[0].diploma }}</p>
                </span>
                <hr />
                <span>
                  <strong>Дата окончания:</strong>
                  <p>{{ individuals[0].year_end }}</p>
                </span> -->
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card
                v-for="(item, index) in contacts"
                :key="index"
                flat
                class="mx-6 mt-3"
              >
                <!-- <Contact :contact="item" :typesContacts="typesContacts" /> -->
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card
                v-for="(item, index) in families"
                :key="index"
                flat
                class="mx-6 mt-3"
              >
                <!-- <Family
                  :family="item"
                  :relatives="relatives"
                  :degreesAffinities="degreesAffinities"
                /> -->
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import Unit from "@/components/Unit.vue";
// import OrgPosition from "@/components/OrgPosition.vue";
// import Organization from "@/components/Organization.vue";
// import Individual from "@/components/Individual.vue";
// import Contact from "@/components/Contact.vue";
// import Family from "@/components/Family.vue";
// import TypesEducation from "@/components/TypesEducation.vue";
// import EducationSchools from "@/components/EducationSchools.vue";
// import Specialities from "@/components/Specialities.vue";
const images = require.context('@/assets/images/', true);
const imagePath = (name) => images(name, true);
export default {
  name: "Employee",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    // WorkPlace,
    // Unit,
    // OrgPosition,
    // Organization,
    // Individual,
    // Contact,
    // Family,
    // TypesEducation,
    // EducationSchools,
    // Specialities,
  },
  data() {
    return {
      employee: {},
      person: {},
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
      tab: null,
    };
  },
  methods: {
    ...mapActions(['fetchEmployeeByID', 'fetchPersonByID']),
    sourcePath(img) {
      return imagePath(img);
    }
  },
  async mounted() {
    this.employee = await this.fetchEmployeeByID(this.id);
    this.person = await this.fetchPersonByID(this.employee.personKey);    
  }
};
</script>

<style scoped></style>
