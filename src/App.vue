<template>
  <v-app>
    <Loading/>
    <SnackabarInfo/>

    <MainAppSidebar v-if="isMainApp" />
    <AdminAppSidebar v-if="isAdminApp" />

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>

  <Footer />
  </v-app>
</template>

<script>

import MainAppSidebar from "./components/MainAppSidebar.vue";
import AdminAppSidebar from "./components/AdminAppSidebar.vue";
import Loading from "./components/Loading.vue";
import SnackabarInfo from "./components/SnackabarInfo.vue";
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {SnackabarInfo, Loading, AdminAppSidebar, MainAppSidebar, Footer},
  data: () => ({
    isMainApp: true,
    isAdminApp: false
  }),

  created() {
    this.showCorrectSidebar();
  },

  watch:{
    $route (to, from){
      this.showCorrectSidebar();
    }
  },

  methods: {
    showCorrectSidebar() {
      this.isAdminApp = this.$route.path.includes('admin');
      this.isMainApp = !this.isAdminApp;
    }
  }
}
</script>

<style scoped>

</style>
