<template>
<v-card
  id="card"
  elevation="2"
>
  <v-card-title id="title">
    Home
  </v-card-title>

  <v-card-title id="subTitle">
    What is Lorem Ipsum?
  </v-card-title>

  <v-card-text class="mainText">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </v-card-text>

  <v-card-text class="mainText">
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  </v-card-text>

  <v-card-text class="mainText">
    It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged.
  </v-card-text>

  <v-card-text class="mainText">
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  </v-card-text>
</v-card>
</template>

<script>
export default ({
  name: 'HomeView',
});
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
