import { Base64 } from 'js-base64';

export default {
  state: {
    types_holiday: JSON.parse(localStorage.getItem('types_holiday') || '[]'),
    holidays: JSON.parse(localStorage.getItem('holidays') || '[]'),
  },
  mutations: {
    updateTypesHoliday(state, records) {
      state.types_holiday = records
      localStorage.setItem('types_holiday', JSON.stringify(state.types_holiday))
    },
    updateHolidays(state, records) {
      state.holidays = records
      localStorage.setItem('holidays', JSON.stringify(state.holidays))
    },
  },
  actions: {
    async fetchTypesHoliday(ctx, id) {
      const username = "Дмитраков С.Н.";
      const password = "340340340";
      const config = {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
          Authorization: `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: "same-origin",
      };

      // const data = await fetch(`http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_ФизическиеЛица?&$format=json&$filter=Ref_Key eq guid'${id}'`, config)
      const data = await fetch(
        "http://localhost:8080/ZUP/odata/standard.odata/Catalog_ВидыПраздников?&$format=json",
        config
      ).then((response) => {
        return response.json();
      });

      const typesHoliday = data.value.map((th) => {
        return {
          refKey: th.Ref_Key,
          description: th.Description,
        };
      });
      // return typesHoliday[0];
      ctx.commit('updateTypesHoliday', typesHoliday)

    },
    async fetchHolidays(ctx, id) {
      const username = "Дмитраков С.Н.";
      const password = "340340340";
      const config = {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json",
          Authorization: `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: "same-origin",
      };
      const gov_holidays = ['0509', '0824', '0308', '0419', '0501', '1014', '0607', '0628', '0101', '0107']
      const prof_holidays = ['1125', '1025', '1020', '1017', '1016', '1014', '1008', '0730', '0725', '0716', '0503', '0428', '0206']
      // const data = await fetch(`http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_ФизическиеЛица?&$format=json&$filter=Ref_Key eq guid'${id}'`, config)
      const data = await fetch(
        "http://localhost:8080/ZUP/odata/standard.odata/InformationRegister_Праздники?&$format=json",
        config
      ).then((response) => {
        return response.json();
      });

      const holidays = data.value.map((h) => {
        return {
          date: `${h.Period.substring(0,4)}-${h.МесяцДень.substring(0,2)}-${h.МесяцДень.substring(2,4)}`,
          typeHoliday: h.ВидПраздника_Key,
          monthDay: h.МесяцДень,
          kindHoliday: gov_holidays.includes(h.МесяцДень) ? 'gov' : prof_holidays.includes(h.МесяцДень) ? 'prof' : 'other',
        };
      });
      // return typesHoliday[0];
      ctx.commit('updateHolidays', holidays)
    },

    /* async fetchSKUDClients(ctx) {
      const doc = new GoogleSpreadsheet('1pg5tGaFeR1RUMTSRHBpnq248-zbFIK5CTHGEvveX7v0');
      // https://docs.google.com/spreadsheets/d/1pg5tGaFeR1RUMTSRHBpnq248-zbFIK5CTHGEvveX7v0/edit?ts=5f97df8c#gid=1101354038
      await doc.useServiceAccountAuth({
        client_email: client_email,
        private_key: private_key,
      });

      await doc.loadInfo();
      // console.log(doc.title);

      // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      const sheet = doc.sheetsByTitle['10_2020']
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

      // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      // const sheet = doc.sheetsByTitle['02.11.2020']
      // const sheet = doc.sheetsByTitle[`${today}`]
              
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
    } */
  },
  getters: {
    getTypesHoliday(state) {
      return state.types_holiday
    },
    getHolidays(state) {
      return state.holidays
    },
  },
};
