<template>
  <v-app id="inspire">
    <v-main class="grey lighten-5">
      <v-sheet class="grey lighten-5" width="100%">
        <component :is="layout">
          <router-view></router-view>
        </component>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import EmptyLayout from '@/layouts/EmptyLayout'
import AdminLayout from '@/layouts/AdminLayout'
export default {
  components: {
    Navbar, EmptyLayout, AdminLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
};
</script>

<style scoped>
.v-main__wrap {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}</style
>>
