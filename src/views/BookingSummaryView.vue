<template>
<v-card
  id="card"
  elevation="2"
>
    <v-card-title id="title">
        Summary of Reservation number: {{ reservationId }}
    </v-card-title>

    <v-card-title class="subTitle">
        Personal Data
    </v-card-title>
    <v-row class="row">
        <v-col class="column" cols="12" sm="6">
            <label class="labelText" for="First Name">First Name:</label>
            <input class="inputText" name="First Name" type="text" :value=firstName disabled>
        </v-col>

        <v-col class="column" cols="12" sm="6">
            <label class="labelText" for="Last Name">Last Name:</label>
            <input class="inputText" type="text" :value=lastName disabled>
        </v-col>
        </v-row>

    <v-row class="row">
        <v-col class="column" cols="12" sm="6">
            <label class="labelText" for="Email">Email:</label>
            <input class="inputText" name="Email" type="text" :value=email disabled>
        </v-col>

        <v-col class="column" cols="12" sm="6">
            <label class="labelText" for="Phone">Phone:</label>
            <input class="inputText" type="text" :value=phone disabled>
        </v-col>
        </v-row>

    <v-card-title class="subTitle">
        Reservation Data
    </v-card-title>

    <v-row class="row">
        <v-col class="column" cols="12" sm="6">
            <label class="labelText" for="Start Date">Start Date:</label>
            <input class="inputText" name="Start Date" type="text" :value=startDate disabled>
        </v-col>

        <v-col class="column" cols="12" sm="6">
            <label class="labelText" for="End Date">End Date:</label>
            <input class="inputText" type="text" :value=endDate disabled>
        </v-col>
    </v-row>
    
    <v-row class="row">
        <v-col class="column" cols="12" sm="6">
            <label class="labelText" for="Price Per Night">Price Per Night:</label>
            <input class="inputText" name="Price Per Night" type="text" :value=pricePerNight disabled>
        </v-col>

        <v-col class="column" cols="12" sm="6">
            <label class="labelText" for="Final Price">Final Price:</label>
            <input class="inputText" type="text" :value=finalPrice disabled>
        </v-col>
    </v-row>
    
    <v-row>
        <v-col cols="12" sm="4">
            <v-btn class="button" color="brown">
                <v-icon class="icon" left> mdi-download </v-icon>
                Download Transaction Confirmation
            </v-btn>
        </v-col>

        <v-col class="columnBottom" cols="12" sm="2" offset-sm="6">
            <v-btn
                    @click="goToPayment()"
                    class="button"
                    color="brown"
                    :disabled = isPaid>
                <v-icon class="icon" left> mdi-cash </v-icon>
                Pay Now
            </v-btn>
        </v-col>

    </v-row>
</v-card>
</template>

<script>
import axios from '../axios'

export default {
    name: 'BookingSummaryView',
    data: () => ({
        isPaid: false,
        roomId : '',
        reservationId: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        startDate: '',
        endDate: '',
        pricePerNight: '',
        finalPrice: ''
    }),
    created: async function() {
        //  Get reservation data
        try {
            const result = await axios.get(`/reservations/${this.$route.params.id}/client`)

            //  Assign reservation data
            this.roomId = result?.data?.rows?.[0]?.room_id

            this.reservationId = result?.data?.rows?.[0]?.reservation_id 
            this.firstName = result?.data?.rows?.[0]?.first_name
            this.lastName = result?.data?.rows?.[0]?.last_name
            this.email = result?.data?.rows?.[0]?.email
            this.phone = result?.data?.rows?.[0]?.phone_number
            this.startDate = new Date( result?.data?.rows?.[0]?.start_date ).toLocaleDateString("pl-PL")
            this.endDate = new Date ( result?.data?.rows?.[0]?.end_date ).toLocaleDateString("pl-PL")
            this.pricePerNight = result?.data?.rows?.[0]?.price
            this.isPaid = result?.data?.rows?.[0]?.paid

            //  Generate final price
            this.generateFinalPrice(result?.data?.rows?.[0]?.start_date, result?.data?.rows?.[0]?.end_date)
        } catch (err) {
            console.log(err.message)
            this.reservationId = 'error!'
            this.firstName = 'error!'
            this.lastName = 'error!'
            this.email = 'error!'
            this.phone = 'error!'
            this.startDate = 'error!'
            this.endDate = 'error!'
            this.pricePerNight = 'error!'
            this.finalPrice = 'error!'
        }
    },
    methods: {
        generateFinalPrice(start_date, end_date) {
            //  Convert string to date
            const startDate= new Date(start_date)
            const endDate = new Date(end_date)

            //  Calculate difference between dates
            const differenceBetweenDates = (endDate.getTime() - startDate.getTime()) / 86400000
            
            //  Calculate final price
            this.finalPrice = differenceBetweenDates * this.pricePerNight
        },
        async goToPayment() {
            //  Generate link for payment
            const url = `http://localhost:5000/checkout-session/1/${this.roomId}/${this.reservationId}`

            //  Redirect for payment
            window.location.href = url
        }
    }
}
</script>

<style scoped>
#card {
    min-height: 80vh;
    padding: 2em;
}

#title {
  font-weight: bold;
  font-size: 1.8em;
  letter-spacing: 0.05em;
}

.subTitle {
    margin-top: 1.5em;
}

.row {
    padding-left: 1em;
    padding-right: 1em;
    margin-bottom: 1em;
}

.column {
    position: relative;
}

.labelText {
    position: absolute;
    top: 1.4em;
    font-weight: bold;
}

.inputText {
    border-bottom: solid 2px #8D6E63;
    color: black;
    text-align: center;
    padding-left: 2em;
    padding-right: 2em;
    width: 100%;
    height: 3em;
}

.columnBottom {
    display: flex;
    align-content: flex-end;
}

.button {
    opacity: 0.9;
    font-weight: bold;
    font-size: 1em;
    margin-left: 1em;
    margin-top: 1em;
    padding: 1.2em;
}

.icon {
    margin-right: 0.5em;
}
</style>
