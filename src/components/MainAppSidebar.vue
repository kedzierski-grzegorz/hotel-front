<template>
  <v-navigation-drawer v-model="sidebar" app class="hidden-sm-and-up">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Welcome to our Hotel
        </v-list-item-title>
        <v-list-item-subtitle>
          Book your room
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
        <v-list-item-action>
          <v-icon dark right>{{ 'mdi-' + item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- This coude above seems to be unused? -->

  <v-app-bar app color="brown">
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
    <v-toolbar-title>
      <router-link id="title" to="/" tag="span" 
        style="text-decoration: none; color: inherit; cursor: pointer;">
          Hotello
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-none d-sm-flex">
      <v-toolbar-items>
        <v-btn
            class="button"
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "MainAppSidebar",
  data: () => ({
    sidebar: false,
    menuItems: [
      { title: 'Home', path: '/', icon: 'home' },
      { title: 'About', path: '/about', icon: 'face' },
      { title: 'Test rooms', path: '/rooms' },
      { title: 'Admin panel', path: '/admin/reservations', icon: 'account-cog' },
    ]
  }),
}
</script>

<style scoped>
#title {
  font-weight: bold;
  font-size: 2em;
  letter-spacing: 0.15em;
}

#title:hover {
  opacity: 0.9;
}

#title:active {
  opacity: 1;
}

.button {
  font-weight: bold;
  font-size: 1em;
  margin-left: 1em;
}
</style>
