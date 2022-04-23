<template>
  <v-app>
    <!-- !!!  This code seems to be unused  !!! -->

    <!-- <v-navigation-drawer v-model="sidebar" app class="hidden-sm-and-up">
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
    </v-navigation-drawer> -->

    <!-- !!!    !!! -->

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Hotel</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-flex">
        <v-toolbar-items>
          <v-btn
              v-for="item in menuItems"
              :key="item.title"
              :to="item.path">
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </div>
    </v-toolbar>

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

export default {
  name: 'App',

  data: () => ({
    sidebar: false,
    menuItems: [
      { title: 'Home', path: '/', icon: 'home' },
      { title: 'About', path: '/about', icon: 'face' },
      { title: 'Test rooms', path: '/rooms' } 
    ]
  }),
}
</script>
