<template>
  <v-navigation-drawer v-if="showSidebar" v-model="sidebar" app class="hidden-sm-and-up">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Admin panel
        </v-list-item-title>
        <v-list-item-subtitle>

        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="item.click ? item.click() : ''"
          :to="item.path">
        <v-list-item-action>
          <v-icon dark right>{{ 'mdi-' + item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar app v-if="showSidebar">
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
    <v-toolbar-title>
      <router-link to="/admin" tag="span" class="text-brown font-weight-bold" style="text-decoration: none; cursor: pointer">
        Admin panel
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-none d-sm-flex">
      <v-toolbar-items>
        <v-btn
            v-for="item in menuItems"
            :key="item.title"
            @click="item.click ? item.click() : ''"
            :to="item.path">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </div>
  </v-app-bar>
</template>

<script>
import AdminService from "../services/admin.service";
import SnackbarService from "../services/snackbar.service";

export default {
  name: "AdminAppSidebar",
  data() {
    return {
      sidebar: false,
      showSidebar: false,
      menuItems: [
        {title: 'Reservations', path: '/admin/reservations', icon: 'book-clock'},
        {title: 'Rooms', path: '/admin/rooms', icon: 'bed'},
        {title: 'Logout', icon: 'power', click: this.logout.bind(this)}
      ]
    }
  },
  mounted() {
    this.showCorrectSidebar();
  },
  watch: {
    $route(to, from) {
      this.showCorrectSidebar();
    }
  },

  methods: {
    showCorrectSidebar() {
      this.showSidebar = this.$route.name !== "Admin/SignIn";
    },

    async logout() {
      AdminService.logout();
      SnackbarService.show({
        text: "You have been logged out",
        color: "Primary"
      });
      await this.$router.push('/admin/sign-in');
    }
  }
}
</script>

<style scoped>

</style>
