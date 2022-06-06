<template>
<v-card
  id="card"
  elevation="2"
>
    <v-card-title id="title">
        Reservation: Room-Name
    </v-card-title>

    <ReservationForm />
</v-card>
</template>

<script>
import ReservationForm from '../components/ReservationForm.vue'

export default {
    name: 'ReservationView',
    components: {
      ReservationForm,
    },
}
</script>

<style scoped>
#card {
  padding: 2em;
}

#title {
  font-weight: bold;
  font-size: 2em;
  letter-spacing: 0.05em;
}
</style>
