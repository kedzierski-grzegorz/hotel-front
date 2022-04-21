<template>
  <v-app>
    <MainAppSidebar v-if="isMainApp" />
    <AdminAppSidebar v-if="isAdminApp" />

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

import MainAppSidebar from "./components/MainAppSidebar.vue";
import AdminAppSidebar from "./components/AdminAppSidebar.vue";

export default {
  name: 'App',
  components: {AdminAppSidebar, MainAppSidebar},
  data: () => ({
    isMainApp: true,
    isAdminApp: false,
    sidebar: false,
    menuItems: [
      { title: 'Home', path: '/', icon: 'home' },
      { title: 'About', path: '/about', icon: 'face' }
    ]
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
