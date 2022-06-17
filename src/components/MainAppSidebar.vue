<template>
  <v-app-bar app color="brown">
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
      { title: 'Rooms', path: '/rooms' },
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
