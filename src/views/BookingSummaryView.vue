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
                Download Transaction Confiramtion
            </v-btn>
        </v-col>

        <v-col class="columnBottom" cols="12" sm="2" offset-sm="6">
            <v-btn class="button" color="brown">
                <v-icon class="icon" left> mdi-cash </v-icon>
                Pay Now
            </v-btn>
        </v-col>

    </v-row>
</v-card>
</template>

<script>
export default {
    name: 'BookingSummaryView',
    data: () => ({
        reservationId: 0,
        firstName: 'John',
        lastName: 'Smith',
        email: 'example@example.com',
        phone: '837459374',
        startDate: '12/07/2022',
        endDate: '20/07/2022',
        pricePerNight: '20$',
        finalPrice: '160$'
    })
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
    z-index: 11111;
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
