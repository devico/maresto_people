<template>
  <div class="my-0">
    <div v-for="(f, i) in listRelations" :key="i">
      <ItemFamily
        :rel_degree="f.rel_degree"
        :individ="f.individ"
        :year_burth="f.year_burth"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemFamily from "./ItemFamily";
export default {
  name: "Family",
  props: ["relatives"],
  components: {
    ItemFamily
  },
  data() {
    return {
    //   typesEducation: [],
    //   specialities: [],
    //   schools: [],
      listRelations: [],
      relationDegree: [],
      persons: []
    };
  },
  async mounted() {
    this.relationDegree = await this.getRelationDegree;
    this.persons = await this.getPersons
    this.getRelationList();
    
  },
  methods: {
    ...mapActions([]),
    getRelationList() {
      this.listRelations = this.relatives.map(r => {
        return {
          rel_degree: this.getCurrentRelationDegree(r.СтепеньРодства_Key),
          individ: this.getCurrentIndividual(r.ФизЛицо_Key),
          year_burth: r.ГодРождения
        };
      });
      
    },
    getCurrentRelationDegree(id) {
      const relDegree = this.relationDegree.filter(rd => {
        return rd.refKey == id;
      });
      
      return relDegree[0].description;
    },
    getCurrentIndividual(id) {
      const person = this.persons.filter(p => {        
        return p.refKey == id;
      });
      return person[0].description;
    },
    
  },
  computed: {
    ...mapGetters(["getTypesEducation", "getSpecialities", "getSchools", 'getPersons', 'getRelationDegree']),
    
  }
};
</script>

<style scoped></style>