<template>
  <div class="wrapper">
    <h1>You cancel the payment</h1>
    <br>
    <p>Please contact us if something went wrong: <a href="mailto:test@test.com">test@test.com</a></p>
  </div>
</template>

<script>
export default {
  name: "CancelPaymentView"
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