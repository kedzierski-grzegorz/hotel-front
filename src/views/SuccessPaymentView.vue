<template>
  <div class="wrapper">
    <h1>Payment success</h1>
    <br>
    <p>Thank You for Your Payment</p>
    <p>We hope your residence will meet your expectations.</p>
  </div>
</template>

<script>
export default {
  name: "SuccessPaymentView"
}
</script>

<style scoped>
.wrapper {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.wrapper > h1 {
  color: #795548;
}
</style>