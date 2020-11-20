<template>
  <div class="my-0">
    <div v-for="(edu, i) in listEdu" :key="i">
      <ItemEducation
        :vid_edu="edu.vid_edu"
        :uch_edu="edu.uch_edu"
        :specialnost="edu.specialnost"
        :diplom="edu.diplom"
        :finish_year="edu.finish_year"
        :kvalification="edu.kvalification"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ItemEducation from "./ItemEducation";
export default {
  name: "Education",
  props: ["educations"],
  components: {
    ItemEducation
  },
  data() {
    return {
      typesEducation: [],
      specialities: [],
      schools: [],
      listEdu: []
    };
  },
  async mounted() {
    this.typesEducation = await this.getTypesEducation;
    this.specialities = await this.getSpecialities;
    this.schools = await this.getSchools;
    this.getEdu();
    // console.log('EEE', this.educations)
    
  },
  methods: {
    ...mapActions([
      "fetchTypeEducation",
      "fetchSpecialities",
      "fetchSchools"
    ]),
    getEdu() {
      this.listEdu = this.educations.map(e => {
        return {
          vid_edu: this.getCurrentEducation(e.ВидОбразования_Key),
          uch_edu: this.getCurrentSchool(e.УчебноеЗаведение_Key),
          specialnost: this.getCurrentSpeciality(e.Специальность_Key),
          diplom: e.Диплом,
          finish_year: e.ГодОкончания,
          kvalification: e.Квалификация
        };
      });
      // console.log('LE: ', this.listEdu)
    },
    getCurrentEducation(id) {
      const type = this.typesEducation.filter(te => {
        return te.refKey == id;
      });
      return type[0].description;
    },
    getCurrentSpeciality(id) {
      const speciality = this.specialities.filter(s => {        
        return s.refKey == id;
      });
      return speciality[0].description;
    },
    getCurrentSchool(id) {
      const school = this.schools.filter(s => {
        return s.refKey == id;
      });
      return school[0].description;
    }
  },
  computed: {
    ...mapGetters(["getTypesEducation", "getSpecialities", "getSchools"]),
    
  }
};
</script>

<style scoped></style>