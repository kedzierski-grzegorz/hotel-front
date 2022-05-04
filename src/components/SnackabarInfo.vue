<template>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
  >
    <span class="text-white">{{ text }}</span>
    <template v-slot:actions>
      <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import SnackbarService from "../services/snackbar.service";

export default {
  name: "SnackabarInfo",
  data: () => ({
    snackbar: false,
    text: `Hello, I'm a snackbar`,
    color: 'primary',
    timeout: 3000
  }),

  mounted() {
    SnackbarService.snackbarInfo = this;
  },

  methods: {
    show(options) {
      this.text = options.text;
      this.color = options.color ?? 'primary';
      this.snackbar = true;
      this.timeout = options.timeout ?? 3000;
    }
  }
}
</script>

<style scoped>

</style>
