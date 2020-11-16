<template>
  <div
    class="pa-0"
    height="70vh"
  >
    <h6></h6>

    <v-card class="mx-auto ml-3 mt-10" width="100%" :elevation="0">
      <v-card-title>Фильтрация</v-card-title>
        
        <v-form ref="form" v-model="valid" lazy-validation class="ml-0 pl-2 pr-2 text-center" @submit.prevent="filterEmployees">
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
          <div class="text-center">
            <v-btn :disabled="!valid" type="submit" color="blue darken-1" class="mr-4 white--text">
            Фильтр
          </v-btn>
          <v-btn @click.prevent="clearFilter" color="orange darken-1" class="mr-4 white--text">
            Сброс
          </v-btn>
          </div>
          
        </v-form>

    </v-card>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ['units', 'positions', 'workPlaces', 'employees', 'persons'],
  data() {
    return {
      valid: false,
      selectPosition: null,
      selectUnit: null,
      selectWorkPlace: null,
      selectGender: null,
      selectWithChild: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      genders: ["Мужской", "Женский"],
      children: ["Есть дети", "Нет детей"],
      
    };
  },

  methods: {
    filterEmployees() {
      let filterPosition = ''
      let filterUnit = ''
      let filterWP = ''
      let filterGender = ''

      if (this.selectPosition !== null) {
        filterPosition += `Должность: ${this.selectPosition}`
      }
      if (this.selectUnit !== null) {
        filterUnit += `Подразделение: ${this.selectUnit}`
      }
      if (this.selectWorkPlace !== null) {
        filterWP += `Адрес: ${this.selectWorkPlace}`
      }
      if (this.selectGender !== null) {
        filterGender += `Пол: ${this.selectGender}`
      }

      let f_posistion = this.employees.filter(e => {
        if (this.selectPosition !== null) {          
          return this.selectPosition == this.getPositionEmployee(e.orgPosition)
        } else {
          return e
        }
      })
      
      let f_unit = f_posistion.filter(e => {
        if (this.selectUnit !== null) {          
          return this.selectUnit == this.getUnitEmployee(e.unitKey)
        } else {
          return e
        }
      })
            
      let f_wplace = f_unit.filter(e => {
        if (this.selectWorkPlace !== null) {          
          return this.selectWorkPlace == this.getWorkPlaceEmployee(e.parentKey)
        } else {
          return e
        }
      })      
      
      let peoples = f_wplace.filter(e => {
        if (this.selectGender !== null) {          
          return this.selectGender == this.getGenderEmployee(e.personKey)
        } else {
          return e
        }
      })
      
      this.selectPosition = null
      this.selectUnit = null
      this.selectWorkPlace = null
      this.selectGender = null
      this.selectWithChild = null

      let result = {
        filterPosition: filterPosition,
        filterUnit: filterUnit,
        filterWP: filterWP,
        filterGender: filterGender,
        peoples: peoples
      }
      
      this.$emit("filtered_employees", result);
    },
    clearFilter() {
      let filterPosition = ''
      let filterUnit = ''
      let filterWP = ''
      let filterGender = ''

      let result = {
        filterPosition: filterPosition,
        filterUnit: filterUnit,
        filterWP: filterWP,
        filterGender: filterGender,
        peoples: this.employees
      }
      
      this.$emit("all_employees", result);
    },

    getWorkPlaceEmployee(wplace) {
      const wrsplace = this.workPlaces.filter((wp) => {
        return wp.refKey == wplace;
      });
      
      if (wrsplace[0] == undefined) {
        return "Без места";
      }
      return wrsplace[0].description;
    },
    getPositionEmployee(position) {
      const pos = this.positions.filter((p) => {
        return p.refKey == position;
      });
      
      if (pos[0] == undefined) {
        return "Без должности";
      }
      return pos[0].description;
    },
    getUnitEmployee(unit) {
      const unt = this.units.filter((u) => {
        return u.refKey == unit;
      });
      
      if (unt[0] == undefined) {
        return "Без должности";
      }
      return unt[0].description;
    },
    getGenderEmployee(person) {
      // console.log('PERSONS', this.persons)
      const pr = this.persons.filter(p => {
        return p.refKey == person
      })     
      
      if (pr[0] == undefined) {
        return "Пол не указан";
      }
      return pr[0].gender;
    }
  },
  computed:  {
    ...mapGetters([ "getUnits", "getPositions", "getWorkPlaces"]),
    getUnitList() {
      const u_list = this.units.map(u => {
        return u.description.substring(0, 30)
      })

      return u_list.sort()

    },
    getPositionList() {
      const poss = this.positions.map(p => {
        return p.description.substring(0, 30)
      })

      return poss.sort()

    },
    getWorkPlaceList() {
      const wrkplaces = this.workPlaces.map((wp) => {
        return wp.description
      });

      return wrkplaces.sort()

      // if (wps[0] == undefined) {
      //   return "Без места";
      // }
      // return wps[0].description;
    },
    
  },
  async mounted() {
    
    
  }
};
</script>
