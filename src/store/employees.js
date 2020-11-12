import { Base64 } from 'js-base64';
import { saveAs } from 'file-saver';
const FileSaver = require('file-saver');

export default {
  state: {
    employees: JSON.parse(localStorage.getItem('employees') || '[]'),
    persons: JSON.parse(localStorage.getItem('persons') || '[]'),
    units: JSON.parse(localStorage.getItem('units') || '[]'),
    positions: JSON.parse(localStorage.getItem('positions') || '[]'),
    workPlaces: JSON.parse(localStorage.getItem('workPlaces') || '[]'),
    typesContact: JSON.parse(localStorage.getItem('typesContact') || '[]'),
    contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
    recruitments: JSON.parse(localStorage.getItem('recruitments') || '[]'),
    typesEducation: JSON.parse(localStorage.getItem('typesEducation') || '[]'),
    specialities: JSON.parse(localStorage.getItem('specialities') || '[]'),
    schools: JSON.parse(localStorage.getItem('schools') || '[]'),
    relationDegree: JSON.parse(localStorage.getItem('relationDegree') || '[]'),
    dismissed: JSON.parse(localStorage.getItem('dismissed') || '[]'), 
    resumes: JSON.parse(localStorage.getItem('resumes') || '[]'),     
  },
  mutations: {
    updateEmployees(state, records) {
      state.employees = records
      localStorage.setItem('employees', JSON.stringify(state.employees))
    },
    updatePersons(state, data) {
      state.persons = data
      localStorage.setItem('persons', JSON.stringify(state.persons))
    },
    updateUnits(state, data) {
      state.units = data
      localStorage.setItem('units', JSON.stringify(state.units))
    },
    updatePositions(state, data) {
      state.positions = data
      localStorage.setItem('positions', JSON.stringify(state.positions))
    },
    updateWorkPlaces(state, data) {
      state.workPlaces = data
      localStorage.setItem('workPlaces', JSON.stringify(state.workPlaces))
    },
    updateTypesContact(state, data) {
      state.typesContact = data
      localStorage.setItem('typesContact', JSON.stringify(state.typesContact))
    },
    updateContacts(state, data) {
      state.contacts = data
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    updateDataRecruitment(state, data) {
      state.recruitments = data
      localStorage.setItem('recruitments', JSON.stringify(state.recruitments))
    },
    updateTypesEducation(state, data) {
      state.typesEducation = data
      localStorage.setItem('typesEducation', JSON.stringify(state.typesEducation))
    },
    updateSpecialities(state, data) {
      state.specialities = data
      localStorage.setItem('specialities', JSON.stringify(state.specialities))
    },
    updateSchools(state, data) {
      state.schools = data
      localStorage.setItem('schools', JSON.stringify(state.schools))
    },
    updateRelationDegree(state, data) {
      state.relationDegree = data
      localStorage.setItem('relationDegree', JSON.stringify(state.relationDegree))
    },    
    updateDismissed(state, data) {
      state.dismissed = data
      localStorage.setItem('dismissed', JSON.stringify(state.dismissed))
    },
    updateListResume(state, data){
      state.resumes = data
      localStorage.setItem('resumes', JSON.stringify(state.resumes))
    }
  },
  actions: {
    async fetchEmployees(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      //fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_СотрудникиОрганизаций?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_СотрудникиОрганизаций?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const filteredEmployees = data.value.filter(e => {
          return e.IsFolder == false
        })
        const employees = filteredEmployees.map(e => {
          return {
            refKey: e.Ref_Key,
            parentKey: e.Parent_Key,
            code: e.Code,
            description: e.Description,
            personKey: e.Физлицо_Key,
            organization: e.Организация_Key,
            typeDogovor: e.ВидДоговора,
            numberDogovor: e.НомерДоговора,
            dateDogovor: e.ДатаДоговора,
            unitKey: e.ТекущееПодразделениеКомпании_Key,
            orgPosition: e.Должность_Key,
            workPlace: e.Parent_Key,
            startWork: e.ДатаНачала
          }
        })

        ctx.commit('updateEmployees', employees)
      })
    },
    async fetchEmployeeByID(ctx, id) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // const data = await fetch(`http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_СотрудникиОрганизаций?&$format=json&$filter=Ref_Key eq guid'${id}'`, config)
      const data = await fetch(`http://localhost:8080/ZUP/odata/standard.odata/Catalog_СотрудникиОрганизаций?&$format=json&$filter=Ref_Key eq guid'${id}'`, config)
        .then(response => {
          return response.json();
        })

      const employee = data.value.map(e => {
        return {
          refKey: e.Ref_Key,
          parentKey: e.Parent_Key,
          code: e.Code,
          description: e.Description,
          personKey: e.Физлицо_Key,
          organization: e.Организация_Key,
          typeDogovor: e.ВидДоговора,
          numberDogovor: e.НомерДоговора,
          dateDogovor: e.ДатаДоговора,
          unitKey: e.ТекущееПодразделениеКомпании_Key,
          orgPosition: e.Должность_Key,
          startWork: e.ДатаНачала
        }
      })

      return employee[0]
    },
    async fetchPersonByID(ctx, id) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // const data = await fetch(`http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_ФизическиеЛица?&$format=json&$filter=Ref_Key eq guid'${id}'`, config)
      const data = await fetch(`http://localhost:8080/ZUP/odata/standard.odata/Catalog_ФизическиеЛица?&$format=json&$filter=Ref_Key eq guid'${id}'`, config)
        .then(response => {
          return response.json();
        })

      const person = data.value.map(p => {
        return {
          refKey: p.Ref_Key,
            parentKey: p.Parent_Key,
            code: p.Code,
            description: p.Description,
            birthday: p.ДатаРождения,
            gender: p.Пол,
            image: `${p.ОсновноеИзображение_Key}.png`,
            family: p.СоставСемьи,
            education: p.Образование
        }
      })
      return person[0]
    },
    async fetchSchools(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_УчебныеЗаведения?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_УчебныеЗаведения?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const schools = data.value.map(s => {
          return {
            refKey: s.Ref_Key,
            code: s.Code,
            description: s.Description
          }
        })
        ctx.commit('updateSchools', schools)
      })


    },
    async fetchSpecialities(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_КлассификаторСпециальностейПоОбразованию?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_КлассификаторСпециальностейПоОбразованию?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const spec = data.value.map(s => {
          return {
            refKey: s.Ref_Key,
            code: s.Code,
            description: s.Description
          }
        })
        ctx.commit('updateSpecialities', spec)
      })

    },
    async fetchTypeEducation(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_ВидыОбразованияФизЛиц?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_ВидыОбразованияФизЛиц?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const typeEdu = data.value.map(t => {
          return {
            refKey: t.Ref_Key,
            code: t.Code,
            description: t.Description
          }
        })
        ctx.commit('updateTypesEducation', typeEdu)
      })
    },
    async fetchRecruitmentByID(ctx, id) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // const data = await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/InformationRegister_Работники?&$format=json', config).then(response => {
      const data = await fetch('http://localhost:8080/ZUP/odata/standard.odata/InformationRegister_Работники?&$format=json', config).then(response => {
        return response.json();
      })

      const docs = data.value.map(r => {
        return r.RecordSet[0] 
      })

      const recruitments = docs.filter(r => {
        if (r.ФизЛицо_Key == id) {
          console.log(r.Period)
          return {
            individualKey: r.ФизЛицо_Key,
            startRecruitment: r.Period
          }
        }
      })

      return recruitments
    },
    async fetchPersons(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_ФизическиеЛица?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_ФизическиеЛица?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const filteredPersons = data.value.filter(p => {
          return p.IsFolder == false
        })
        const persons = filteredPersons.map(p => {
          return {
            refKey: p.Ref_Key,
            parentKey: p.Parent_Key,
            code: p.Code,
            description: p.Description,
            birthday: p.ДатаРождения,
            gender: p.Пол,
            image: `${p.ОсновноеИзображение_Key}.png`,
            family: p.СоставСемьи,
            education: p.Образование
          }
        })

        ctx.commit('updatePersons', persons)
      })
    },
    async fetchUnits(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_Подразделения?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_Подразделения?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const units = data.value.map(u => {
          return {
            refKey: u.Ref_Key,
            code: u.Code,
            description: u.Description
          }
        })

        ctx.commit('updateUnits', units)
      })
    },
    async fetchPositions(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_ДолжностиОрганизаций?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_ДолжностиОрганизаций?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const positions = data.value.map(p => {
          return {
            refKey: p.Ref_Key,
            code: p.Code,
            description: p.Description
          }
        })

        ctx.commit('updatePositions', positions)
      })
    },
    async fetchWorkPlaces(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch(`http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_СотрудникиОрганизаций?&$format=json&$filter=IsFolder eq'true'`, config).then(response => {
      await fetch(`http://localhost:8080/ZUP/odata/standard.odata/Catalog_СотрудникиОрганизаций?&$format=json&$filter=IsFolder eq'true'`, config).then(response => {
        return response.json();
      }).then(data => {
        const workPlaces = data.value.map(wp => {
          return {
            refKey: wp.Ref_Key,
            code: wp.Code,
            description: wp.Description
          }
        })
        ctx.commit('updateWorkPlaces', workPlaces)
      })
    },
    async fetchTypesContact(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_ВидыКонтактнойИнформации?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_ВидыКонтактнойИнформации?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const typesContact = data.value.map(tc => {
          return {
            refKey: tc.Ref_Key,
            code: tc.Code,
            description: tc.Description
          }
        })
        ctx.commit('updateTypesContact', typesContact)
      })
    },
    async fetchContacts(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/InformationRegister_КонтактнаяИнформация?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/InformationRegister_КонтактнаяИнформация?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const contacts = data.value.map(c => {
          return {
            personKey: c.Объект,
            kind: c.Вид,
            type: c.Тип,
            description: c.Представление
          }
        })
        ctx.commit('updateContacts', contacts)
      })
    },
    async fetchDismissed(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/InformationRegister_КонтактнаяИнформация?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Document_Увольнение?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        
        const workers = data.value.map(d => {
           return d.Работники
        })
        const dismiss = workers.map(w => {
          return w[0].Сотрудник_Key
        })
        // console.log('DSM: ', dismiss)
        ctx.commit('updateDismissed', dismiss)

      })
    },
    async fetchRelationDegree(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      // await fetch('http://people.maresto.ua/ZUP/odata/standard.odata/Catalog_СтепениРодстваФизЛиц?&$format=json', config).then(response => {
      await fetch('http://localhost:8080/ZUP/odata/standard.odata/Catalog_СтепениРодстваФизЛиц?&$format=json', config).then(response => {
        return response.json();
      }).then(data => {
        const relDegree = data.value.map(rd => {
          return {
            refKey: rd.Ref_Key,
            code: rd.Code,
            description: rd.Description
          }
        })
        ctx.commit('updateRelationDegree', relDegree)
      })
    },
    async fetchResume(ctx) {
      const username = 'Дмитраков С.Н.';
      const password = '340340340';
      const config = {
        method: "GET",
        headers: {
          'Access-Control-Allow-Origin': '*',
          "content-type": "application/json",
          "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
        },
        withCredentials: true,
        credentials: 'same-origin',
      };

      await fetch("http://localhost:8080/ZUP/odata/standard.odata/Catalog_ХранилищеДополнительнойИнформации?&$format=json", config).then(response => {
        return response.json()
      }).then(data => {
        const files = data.value.map(f => {
          return {
            refKey: f.Ref_Key,
            description: f.Description,
            file_name: f.ИмяФайла,
            person_key: f.Объект
          }
        })
        ctx.commit('updateListResume', files)
      })
      
    },
  },
  getters: {
    getEmployees(state) {
      return state.employees
    },
    getPersons(state) {
      return state.persons
    },
    getUnits(state) {
      return state.units
    },
    getPositions(state) {
      return state.positions
    },
    getWorkPlaces(state) {
      return state.workPlaces
    },
    getTypesContact(state) {
      return state.typesContact
    },
    getContacts(state) {
      return state.contacts
    },
    getRecruitments(state) {
      return state.recruitments
    },
    getTypesEducation(state) {
      return state.typesEducation
    },
    getSpecialities(state) {
      return state.specialities
    },
    getSchools(state) {
      return state.schools
    },
    getRelationDegree(state) {
      return state.relationDegree
    },
    getDismissed(state) {
      return state.dismissed
    },
    getResumes(state) {
      return state.resumes
    },
    
  }
}
