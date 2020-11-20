<template>
  <div>
    <div class="app-admin-layout">
      <Navbar ref="drawer"/>
      <AppBar @toggle-drawer="$refs.drawer.mini = !$refs.drawer.mini"/>
      <main class="app-content">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import AppBar from "@/components/AppBar";
export default {
  name: "admin-layout",
  data: () => ({
    mini: false,
  }),
  components: {
    Navbar, AppBar
  },
  methods: {
    toggleMini(mini) {
      this.mini = mini
    }
  }
};
</script>