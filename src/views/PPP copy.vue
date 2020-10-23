<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Табельный</th>
          <th class="text-left">Комментарий</th>
          <th class="text-left">Включен</th>
          <th class="text-left">IP</th>
          <th class="text-left">Последний вход</th>
          <th class="text-left">Имя</th>
          <th class="text-left">Сервис</th>
          <th class="text-left">Дата начала</th>
          <th class="text-left">Дата окончания</th>
          <th class="text-left">Тип</th>
          <th class="text-left">Работает после 01092020</th>
          <th class="text-left">Прим.</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in ppp_clients"
          :key="item.name"
        >
          <td>{{ item.personal_number }}</td>
          <td>{{ item.comment }}</td>
          <td>{{ item.enabled }}</td>
          <td>{{ item.ip }}</td>
          <td>{{ item.LastLoggedOUT }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.Service }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.stop_date }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.work_after_01092020 }}</td>
          <td>{{ item.prim }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
const RouterOSClient = require('routeros-client').RouterOSClient;
export default {
  data: () => ({
    ppp_clients: [],
  }),
  async mounted() {
    await this.fetchPPPClients()
    this.ppp_clients = this.getPPPClients
    // this.getDataFromMikrotik()
    this.getVpnUsers()
  },
  methods: {
    ...mapActions(['fetchPPPClients', 'getDataFromMikrotik', 'getVpnUsers']),   
  },
  computed: {
    ...mapGetters(['getPPPClients'])
  }
};
</script>

