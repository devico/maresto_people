import { GoogleSpreadsheet } from 'google-spreadsheet'
import {client_email, private_key } from "../common/keys.json"

export default {
  state: {
        
  },
  mutations: {   
    
  },
  actions: {
    async setEmployeesToTabel(ctx, data) {
        const doc = new GoogleSpreadsheet('1SENJfrbUtiSj2d9zz-xQSwKZ7lscD1T322t4hsyk-OI');
        await doc.useServiceAccountAuth({
          client_email: client_email,
          private_key: private_key,
        });
  
        await doc.loadInfo();
  
        // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
        // const sheet = doc.sheetsByTitle['02.11.2020']
        // const sheet = doc.sheetsByTitle[`${today}`]
        console.log(data.month, '_', data.year)
                
        const sheet = doc.sheetsByTitle['10_2020']
        // console.log('DATA', data)
        let interval = 2 * 1000; // 10 seconds;
        

        for (let i = 0; i <= data.data.length-1; i++) {
            setTimeout( function (i) {
                // console.log('L: ', i)
                sheet.addRow({
                    'num': i+1,
                    'personal_number': data.data[i].personal_number, 
                    'full_name': data.data[i].fullName,
                    '1': data.data[i].day1,
                    '2': data.data[i].day2,
                    '3': data.data[i].day3,
                    '4': data.data[i].day4,
                    '5': data.data[i].day5,
                    '6': data.data[i].day6,
                    '7': data.data[i].day7,
                    '8': data.data[i].day8,
                    '9': data.data[i].day9,
                    '10': data.data[i].day10,
                    '11': data.data[i].day11,
                    '12': data.data[i].day12,
                    '13': data.data[i].day13,
                    '14': data.data[i].day14,
                    '15': data.data[i].day15,
                    '16': data.data[i].day16,
                    '17': data.data[i].day17,
                    '18': data.data[i].day18,
                    '19': data.data[i].day19,
                    '20': data.data[i].day20,
                    '21': data.data[i].day21,
                    '22': data.data[i].day22,
                    '23': data.data[i].day23,
                    '24': data.data[i].day24,
                    '25': data.data[i].day25,
                    '26': data.data[i].day26,
                    '27': data.data[i].day27,
                    '28': data.data[i].day28,
                    '29': data.data[i].day29,
                    '30': data.data[i].day30,
                    '31': data.data[i].day31,
                })                
            }, interval * i, i);
        }


        // data.map((item, idx) => {
            
        //         setTimeout(() => {
        //             sheet.addRow({'personal_number': parseInt(item.code, 10), 'full_name': item.description})
        //         },10000)
            
            
        // })
        
        // console.log('RW', sheet.addRow({'TEST': test}))
        // const rows = await sheet.getRows();     
        
        // console.log('RW', rows)
        // const data = rows.map(a => {
        //   return {
        //     fullName: a.full_name,
        //     personal_number: a.personal_number,          
        //     date: a.date,
        //     coming: a.coming
        //   }
        // })
        
        // ctx.commit('updateSKUDEmployeesToday', data)
    },
    async fetchTabelFromGS(ctx, data) {
        const doc = new GoogleSpreadsheet('1SENJfrbUtiSj2d9zz-xQSwKZ7lscD1T322t4hsyk-OI');
        await doc.useServiceAccountAuth({
          client_email: client_email,
          private_key: private_key,
        });
  
        await doc.loadInfo();
                  
        const sheet = doc.sheetsByTitle['10_2020']
        
        const rows = await sheet.getRows();
        
        // console.log('RW', rows)
        const data_rows = rows.map((a, i) => {
          return {
            'num': i+1,
            'personal_number': a.personal_number, 
            'full_name': a.full_name,
            day1: a["1"],
            day2: a["2"],
            day3: a["3"],
            day4: a["4"],
            day5: a["5"],
            day6: a["6"],
            day7: a["7"],
            day8: a["8"],
            day9: a["9"],
            day10: a["10"],
            day11: a["11"],
            day12: a["12"],
            day13: a["13"],
            day14: a["14"],
            day15: a["15"],
            day16: a["16"],
            day17: a["17"],
            day18: a["18"],
            day19: a["19"],
            day20: a["20"],
            day21: a["21"],
            day22: a["22"],
            day23: a["23"],
            day24: a["24"],
            day25: a["25"],
            day26: a["26"],
            day27: a["27"],
            day28: a["28"],
            day29: a["29"],
            day30: a["30"],
            day31: a["31"],
          }
        })
        console.log('R: ', data_rows)
        return data_rows
        // ctx.commit('updateTabelFromGS', data)
    },
  },
  getters: {
       
  }
}