<template>
  <v-footer
    color="brown"
    padles
    id="footer"
  >
    <v-card
      width="100%"
      class="flex"
      flat
      tile
      color="brown"
    >
      <v-card-title class="teal">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          icon
          color="brown"
          flat
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 text-center" style="color: white;">
        {{ new Date().getFullYear() }} — <strong>Hotello</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
    name: 'Footer',
        data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    })
}
</script>

<style scoped>
#footer {
    width: 100vw;
}
</style>