<template>
  <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
  >
    <v-card
        color="primary"
        dark
    >
      <v-card-text class="text-white">
        <v-progress-circular
            indeterminate
            color="white"
        ></v-progress-circular>
        Please wait
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LoadingService from "../services/loading.service";

export default {
  name: "Loading",
  data() {
    return {
      dialog: false
    }
  },

  mounted() {
    LoadingService.loadingComponent = this;
  },

  methods: {
    show() {
      this.dialog = true;
    },

    hide() {
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>
