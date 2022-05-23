<template>
<v-card
  id="card"
  elevation="2"
>
  <v-card-title id="title">
    About
  </v-card-title>

  <v-card-title id="subTitle">
    Why do we use it?
  </v-card-title>

  <v-card-text class="mainText">
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
  </v-card-text>

  <v-card-text class="mainText">
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
    as opposed to using 'Content here, content here', making it look like readable English.
  </v-card-text>

  <v-card-text class="mainText">
    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
    and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
  </v-card-text>

  <v-card-text class="mainText">
    Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
  </v-card-text>
  
</v-card>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
#card {
  padding: 2em;
  height: 80vh
}

#title {
  font-weight: bold;
  font-size: 2em;
  letter-spacing: 0.05em;
}

#subTitle {
  letter-spacing: 0.05em;
  margin-top: 1.5em;  
}

.mainText {
  font-size: 1.2em;
  letter-spacing: 0.2em;
  width: 80vw;
  margin-top: 1em;
}

</style>
