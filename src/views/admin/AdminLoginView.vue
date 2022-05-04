<template>
  <v-row class="login-wrapper" align="center" justify="center">
    <v-col class="login-form">
      <v-card class="login-form" elevation="6">
        <form @submit.prevent="submit">
          <h4>Administration panel</h4>
          <h3 class="mb-6">Sign in</h3>
          <v-text-field
              label="Login or email"
              v-model="v$.loginOrEmail.$model"
              :error-messages="v$.loginOrEmail.$error ? 'Login or email are required' : ''"
          ></v-text-field>
          <v-text-field
              label="Password"
              v-model="v$.password.$model"
              :error-messages="v$.password.$error ? 'Password is required' : ''"
              type="password"
          ></v-text-field>
          <v-btn block color="primary" type="submit">Sign in</v-btn>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AdminService from "../../services/admin.service";
import {required} from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core'
import LoadingService from "../../services/loading.service";
import SnackbarService from "../../services/snackbar.service";

export default {
  name: "AdminLoginView",
  data() {
    return {
      v$: useVuelidate(),
      loginOrEmail: '',
      password: ''
    };
  },

  validations() {
    return {
        loginOrEmail: {required},
        password: {required}
    }
  },

  methods: {
    async submit() {
      this.v$.$touch();
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        return;
      }

      let success = false;

      LoadingService.show();
      try {
        const sessionData = await AdminService.signIn(
            this.v$.loginOrEmail.$model,
            this.v$.password.$model
        );

        this.v$.$reset();

        SnackbarService.show({
          text: "You have been logged in",
          color: "success"
        });

        success = true;
      } catch (e) {
        console.error(e);
        SnackbarService.show({
          text: e.response?.data?.message ?? "You have been logged in",
          color: "red"
        });
      }
      LoadingService.hide();

      if (success) {
        await this.$router.push('/admin/panel');
      }
    }
  }
}
</script>

<style scoped>
 .login-wrapper {
   height: 100vh;
 }

 .login-form {
   max-width: 25rem;
   padding: 2rem;
 }
</style>
