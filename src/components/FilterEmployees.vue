<template>
  <div
    class="mt-15 pa-0"
    height="70vh"
  >
    <v-form ref="form" v-model="valid" lazy-validation class="ma-0 pa-0 text-center">
      <v-select      
        v-model="selectPosition"
        :items="getPositionList"
        dense
        outlined
        label="Должность"
      ></v-select>
       <v-select       
        v-model="selectUnit"
        :items="getUnitList"
        dense
        outlined
        label="Подразделение"
        
      ></v-select>
      <v-select
        v-model="selectWorkPlace"
        :items="getWorkPlaceList"
        label="Место работы"
        dense
        outlined
      ></v-select>
      <v-select
        v-model="selectGender"
        :items="genders"
        label="Пол"
        dense
        outlined
      ></v-select>
      <v-select
        v-model="selectWithChild"
        :items="children"
        label="С детьми или без"
        dense
        outlined
      ></v-select>

      <v-btn :disabled="!valid" color="blue darken-1" class="mr-4 white--text">
        Фильтровать
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectPosition: null,
      selectUnit: null,
      selectWorkPlace: null,
      selectGender: null,
      selectWithChild: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      genders: ["Мужской", "Женский"],
      children: ["Есть дети", "Нет детей"],
      units: [],
      positions: [],
      workPlaces: [],
    };
  },

  methods: {
    
  },
  computed:  {
    ...mapGetters([ "getUnits", "getPositions", "getWorkPlaces"]),
    getUnitList() {
      return this.units.map(u => {
        return u.description.substring(0, 30)
      })

    },
    getPositionList() {
      return this.positions.map(p => {
        return p.description.substring(0, 30)
      })

    },
    getWorkPlaceList() {
      return this.workPlaces.map(wp => {
        return wp.description
      })

    }
  },
  async mounted() {
    this.units = await this.getUnits;
    this.positions = await this.getPositions;
    this.workPlaces = await this.getWorkPlaces;
  }
};
</script>
