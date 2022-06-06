<template>
<v-card
  id="card"
  elevation="2"
>
    <v-card-title id="title">
        Reservation: {{ roomTitle }}
    </v-card-title>

    <ReservationForm />
</v-card>
</template>

<script>
import ReservationForm from '../components/ReservationForm.vue'
import axios from '../axios'

export default {
    name: 'ReservationView',
    components: {
      ReservationForm,
    },
    data() {
      return {
        roomTitle: ''
      }
    },
    created: async function() {
      //  Try to get and then set room title
      try {
        const result = await axios.get(`/rooms/${this.$route.params.id}`)
        this.roomTitle = result?.data?.rows?.[0]?.title
      } catch (err) {
        console.log(err.message)
        this.roomTitle = 'Ops something went wrong'
      }
    }
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
