import { apiService } from "../common/api.service.js";
const o = require('odata').o;
import { Base64 } from 'js-base64';

export default {
  state: {
    employees: []
  },
  mutations: {
    updateEmployees(state, records) {
      state.employees = records
      localStorage.setItem('employees', JSON.stringify(state.employees))
    }
  },
  actions: {
    async fetchEmployees(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        batch: {
          boundaryPrefix: "batch_",
          changsetBoundaryPrefix: "changset_",
          endpoint: "$batch",
          headers: new Headers({
            "Content-Type": "multipart/mixed",
          }),
          useChangset: false,
        },
        credentials: "omit",
        fragment: "value",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        }),
        mode: "cors",
        redirect: "follow",
        referrer: "client",
        onStart: () => null,
        onFinish: () => null,
        onError: () => null,
      }
    // (async () => {
      // const oHandler = await o('http://192.168.58.106:8080/Corp_ZUP/odata/standard.odata/', config).get('Catalog_СотрудникиОрганизаций?$format=json').query()
    // })();
      // const data2 = await oHandler.get('Catalog_СотрудникиОрганизаций?$format=json')

        // .get('/Catalog_СотрудникиОрганизаций?$format=json')
      
      const oHandler = await o('http://192.168.58.106:8080/Corp_ZUP/odata/standard.odata/Catalog_СотрудникиОрганизаций?$format=json', config).get(function(data) {
        // console.log(data); 
    });

      // let endpoint = 'http://192.168.58.106:8080/Catalog_СотрудникиОрганизаций?$format=json';
      // await apiService(endpoint).then(data => {
      //   console.log('1', data)
      //   ctx.commit('updateEmployees', data)
      // })
      // console.log(oHandler)
    }
  },
  getters: {
    getEmployees(state) {
      return state.employees
    }
  }
}