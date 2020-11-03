import { GoogleSpreadsheet } from 'google-spreadsheet'
import {client_email, private_key } from "../common/keys.json"

export default {
  state: {
    ppp_clients: JSON.parse(localStorage.getItem('ppp_clients') || '[]'),
    skud_clients: JSON.parse(localStorage.getItem('skud_clients') || '[]'),
    ovpn_clients: JSON.parse(localStorage.getItem('ovpn_clients') || '[]'),
    active_vpn_users: JSON.parse(localStorage.getItem('active_vpn_users') || '[]'),
    active_office_users: [],
    
  },
  mutations: {
    updatePPPClients(state, records) {
      state.ppp_clients = records
      localStorage.setItem('ppp_clients', JSON.stringify(state.ppp_clients))
    },    
    updateSKUDClients(state, records) {
      state.skud_clients = records
      localStorage.setItem('skud_clients', JSON.stringify(state.skud_clients))
    },
    updateVpnUsersConnection(state, records) {
      state.ovpn_clients = records
      localStorage.setItem('ovpn_clients', JSON.stringify(state.ovpn_clients))
    },    
    updateActiveVpnUsers(state, records) {
      state.active_vpn_users = records
      localStorage.setItem('active_vpn_users', JSON.stringify(state.active_vpn_users))
    },    
    updateSKUDEmployeesToday(state, records) {
      state.active_office_users = records      
    },
  },
  actions: {
    async fetchActiveVpnUsers(ctx) {
      // fetch('http://localhost:4000/ppp_secret').then(response => {
      //   return response.json();
      // }).then(data => {
      //   console.log("Secret: ", data)
      //   // ctx.commit('updateDataMikrotik', data)
      // })

      fetch('http://localhost:4000/ppp_active').then(response => {
        return response.json();
      }).then(data => {
        const activeVpnUsers = data.map(avu => {
          return {
            name: avu.name,
            service: avu.service,
            uptime: avu.uptime
          }
        })
        ctx.commit('updateActiveVpnUsers', activeVpnUsers)
        // $$path: "/ppp/active"
        // address: "10.58.1.9"
        // callerId: "46.150.102.210"
        // encoding: "MPPE128 stateless"
        // id: "*8000000A"
        // limitBytesIn: 0
        // limitBytesOut: 0
        // name: "donetsk93_ppp"
        // radius: false
        // service: "pptp"
        // sessionId: "0x8180000A"
        // uptime: "4d19h35m15s"
        console.log("Active: ", data)
        // ctx.commit('updateDataMikrotik', data)
      })
    },
    async getVpnUsers(ctx) {
      const res = await fetch('http://localhost:4000/api/vpnusers')
      const data = await res.json();
      const datetime = "2020-09"
  
      const uLogin =  data.map(u => {
        return u.login
      })

      const usersLogin = uLogin.filter((v, i, a) => a.indexOf(v) === i);

      // console.log('UL: ', usersLogin)

      const vpnConnectionsByMonth = usersLogin.map(ul => {
        const conns = data.filter(c => {
          if (ul == c.login) {
            if (c.timestamp.startsWith(datetime) && c.action == "DISCONNECTED") {
              return {
                timestamp: c.timestamp,
                uptime: c.uptime
              }
            }
          }          
        })

        return {
          login: ul,
          connections: conns
        }
        
        
      })
      // const vpnConnectionsByMonth = data.filter(c => {
      //   return (c.timestamp.startsWith(datetime) && c.action == "DISCONNECTED")
      // })
      // console.log('Ietm: ', vpnConnectionsByMonth)
      
      ctx.commit('updateVpnUsersConnection', vpnConnectionsByMonth)
      
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
  
    },
    async fetchSKUDClients(ctx) {
      const doc = new GoogleSpreadsheet('1pg5tGaFeR1RUMTSRHBpnq248-zbFIK5CTHGEvveX7v0');
      // https://docs.google.com/spreadsheets/d/1pg5tGaFeR1RUMTSRHBpnq248-zbFIK5CTHGEvveX7v0/edit?ts=5f97df8c#gid=1101354038
      await doc.useServiceAccountAuth({
        client_email: client_email,
        private_key: private_key,
      });

      await doc.loadInfo();
      // console.log(doc.title);

      // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      const sheet = doc.sheetsByTitle['DATA']
      const rows = await sheet.getRows();
      const data = rows.map(r => {
        return {
          n: r.n,
          fullName: r.full_name,
          position: r.position,
          personal_number: r.personal_number,
          num1: r['1'],
          num2: r['2'],
          num3: r['3'],
          num4: r['4'],
          num5: r['5'],
          num6: r['6'],
          num7: r['7'],
          num8: r['8'],
          num9: r['9'],
          num10: r['10'],
          num11: r['11'],
          num12: r['12'],
          num13: r['13'],
          num14: r['14'],
          num15: r['15'],
          num16: r['16'],
          num17: r['17'],
          num18: r['18'],
          num19: r['19'],
          num20: r['20'],
          num21: r['21'],
          num22: r['22'],
          num23: r['23'],
          num24: r['24'],
          num25: r['25'],
          num26: r['26'],
          num27: r['27'],
          num28: r['28'],
          num29: r['29'],
          num30: r['30'],
          num31: r['31'],
          total: r.total
        }
      })
      ctx.commit('updateSKUDClients', data)

    },
    async fetchSKUDCurrentDay(ctx) {
      const doc = new GoogleSpreadsheet('1t-Rx1AM1TZyrzx2lFKiH5qEE7Rf8ASdwD2xYhIqgqWI');
      await doc.useServiceAccountAuth({
        client_email: client_email,
        private_key: private_key,
      });

      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10) 
      {
          dd='0'+dd;
      } 

      if(mm<10) 
      {
          mm='0'+mm;
      } 
      today = dd+'.'+mm+'.'+yyyy
      console.log(today)

      await doc.loadInfo();
      console.log(doc.title);
      
      // today = mm+'/'+dd+'/'+yyyy;
      // console.log(today);
      // today = dd+'-'+mm+'-'+yyyy;
      // console.log(today);
      // today = dd+'/'+mm+'/'+yyyy;
      // console.log(today);

      // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      // const sheet = doc.sheetsByTitle['02.11.2020']
      // const sheet = doc.sheetsByTitle[`${today}`]
      // const sheet = doc.sheetsByTitle['02.11.2020']
      // const sheet = doc.sheetsByTitle['03.11.2020']
      // console.log('SH', sheet._cells)
      // if (sheet._cells.length !== 0) {
      //   console.log(sheet._cells.length !== 0)
      //   const rows = await sheet.getRows();     
      
      //   const data = rows.map(a => {
      //     return {
      //       fullName: a.full_name,
      //       personal_number: a.personal_number,          
      //       date: a.date,
      //       coming: a.coming
      //     }
      //   })
        
      //   ctx.commit('updateSKUDEmployeesToday', data)
      // }
      // console.log(sheet._cells.length !== 0)
        const sheet = doc.sheetsByTitle[`${today}`]
        const rows = await sheet.getRows();     
      
        const data = rows.map(a => {
          return {
            fullName: a.full_name,
            personal_number: a.personal_number,          
            date: a.date,
            coming: a.coming
          }
        })
        
        ctx.commit('updateSKUDEmployeesToday', data)
    
      // console.log('SH ', sheet._cells)
    }
  },
  getters: {
    getPPPClients(state) {
      return state.ppp_clients
    },
    getSKUDClients(state) {
      return state.skud_clients
    },
    getOVPNClients(state) {
      return state.ovpn_clients
    },
    getActiveVpnUsers(state) {
      return state.active_vpn_users
    },
    getActiveOfficeUsers(state) {
      return state.active_office_users
    },
    
  }
}