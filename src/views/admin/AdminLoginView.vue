<template>
  <h1>Sign in</h1>
</template>

<script>
import AdminService from "../../services/admin.service";

export default {
  name: "AdminLoginView",
  async mounted() {
    await AdminService.signIn('admin', 'admin');
    await AdminService.test();
  }
}
</script>

<style scoped>

</style>
