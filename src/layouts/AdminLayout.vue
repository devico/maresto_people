<template>
  <div>
    <div class="app-admin-layout">
      <Navbar />
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
export default {
  name: "admin-layout",
  data: () => ({
    
  }),
  components: {
    Navbar,   
  }
};
</script>