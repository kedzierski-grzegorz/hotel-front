<template>
<v-card
  id="card"
  elevation="2"
>
    <v-card-title id="title">
        Reservation: {{ roomTitle }}
    </v-card-title>

    <ReservationForm :disabledDates = dates />
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
        roomTitle: '',
        reservations: [],
        dates: [],
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

      //  Try to get room's reservations and generate disabled dates
      try {
        const reservationsResult = await axios.get(`/reservations/room/${this.$route.params.id}`)
        this.reservations = reservationsResult?.data?.rows
        this.generateDisabledDates()
      } catch (err) {
        console.log(err.message)
      }
    },
    methods: {
      generateDisabledDates() {
        try {
          //  Run this loop for each reservations of room
          this.reservations.forEach(row => {
            const start_date = new Date(row?.start_date)
            const end_date = new Date(row?.end_date)
  
            //  Generate array of disabled dates
            while (start_date <= end_date) {
                this.dates.push(new Date(start_date))
                start_date.setDate(start_date.getDate() + 1)
            }
          })
        } catch (err) {
          console.log(err.message)
        }
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
