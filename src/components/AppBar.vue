<template>
  <v-app-bar app color="#2C3A47" dark>
    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4"
      ><span class="hidden-sm-and-down"></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="logUserOut">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    mini: false,
  }),
  mounted() {
    
  },
  methods: {
   logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  }, 
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
