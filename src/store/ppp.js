import { GoogleSpreadsheet } from 'google-spreadsheet'
import {client_email, private_key } from "../common/keys.json"

export default {
  state: {
    ppp_clients: JSON.parse(localStorage.getItem('ppp_clients') || '[]'),
  },
  mutations: {
    updatePPPClients(state, records) {
        state.ppp_clients = records
        localStorage.setItem('ppp_clients', JSON.stringify(state.ppp_clients))
      },
    
  },
  actions: {
    async getDataFromMikrotik(ctx) {
      // fetch('http://localhost:4000/ppp_secret').then(response => {
      //   return response.json();
      // }).then(data => {
      //   console.log("Secret: ", data)
      //   // ctx.commit('updateDataMikrotik', data)
      // })

      // fetch('http://localhost:4000/ppp_active').then(response => {
      //   return response.json();
      // }).then(data => {
      //   console.log("Active: ", data)
      //   // ctx.commit('updateDataMikrotik', data)
      // })
    },
    async getVpnUsers(ctx) {
      fetch('http://localhost:4000/api/vpnusers').then(response => {
        return response.json();
      }).then(data => {
        // console.log("VPN users: ", data)
        // ctx.commit('updateDataMikrotik', data)
      })
    },
    async fetchPPPClients(ctx) {
        const doc = new GoogleSpreadsheet('14ekGHIeqRgHse1_q7bXk6nukhgRJQevgFYXGMrPl-pY');
  
        await doc.useServiceAccountAuth({
          client_email: client_email,
          private_key: private_key,
        });
  
        await doc.loadInfo();
        // console.log(doc.title);
  
        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
        const rows = await sheet.getRows();
        const data = rows.map(r => {
            return {
                personal_number: r.Personal_Number,
                login: r.Login,
                status: r.Status,
                ip: r.IP,
                service: r.Service,
                work_after_01102020: r.work_after_01102020,
                based_on: r.based_on,
                prim: r['Прим.']
            }
        })
        // console.log(rows[0]);
        // console.log(r.Comment);
        
        // await sheet.loadCells('A1:E10'); // loads a range of cells
        // console.log(sheet.cellStats)
        // const a1 = sheet.getCell(0, 0)
        // const c6 = sheet.getCellByA1('C6')
        // console.log(a1.value);
        // console.log(c6.value);
        
        ctx.commit('updatePPPClients', data)
  
      }
  },
  getters: {
    getPPPClients(state) {
        return state.ppp_clients
      },
  }
}