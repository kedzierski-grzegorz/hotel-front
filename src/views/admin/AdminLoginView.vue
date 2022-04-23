<template>
  <h1>Sign in</h1>
</template>

<script>
import AdminService from "../../services/admin.service";

export default {
  name: "AdminLoginView",
  mounted() {
    AdminService.signIn('admin', 'admin');
  }
}
</script>

<style scoped>

</style>
