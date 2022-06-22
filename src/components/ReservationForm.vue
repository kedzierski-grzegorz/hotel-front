<template>
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submitForm"
>

    <v-row>
    <v-col cols="12" sm="6">
        <Datepicker
        inputClassName="dp-custom-input"
        v-model="date"
        range
        autoApply
        format="dd/MM/yyyy"
        placeholder="Select Date"
        required
        :state="isDateValid"
        @blur="validateDate"
        :disabledDates="disabledDates"
        :enableTimePicker="false"
        />
    </v-col>

    <v-col cols="12" sm="6">
        <v-text-field
        v-model="email"
        :counter="64"
        :rules="emailRules"
        label="E-mail"
        required
        ></v-text-field>
    </v-col>
    </v-row>
    
    <v-row>
    <v-col cols="12" sm="6">
        <v-text-field
            class="input"
            v-model="firstName"
            :counter="50"
            :rules="firstNameRules"
            label="First Name"
            required
        ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
        <v-text-field
            class="input"
            v-model="lastName"
            :counter="120"
            :rules="lastNameRules"
            label="Last Name"
            required
        ></v-text-field>
    </v-col>
    </v-row>

    <v-row>
    <v-col cols="12" sm="6">
        <v-text-field
            v-model="documentNumber"
            :counter="11"
            :rules="documentNumberRules"
            label="Document Number"
            required
        ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
        <v-text-field
        v-model="phoneNumber"
        :counter="9"
        :rules="phoneNumberRules"
        label="Phone Number"
        required
        ></v-text-field>
    </v-col>
    </v-row>

    <v-row>
    <v-col cols="12" sm="4">
        <v-text-field
            v-model="postalCode"
            :counter="6"
            :rules="postalCodeRules"
            label="Postal Code (XX-XXX)"
            required
        ></v-text-field>
    </v-col>

    <v-col cols="12" sm="4">
        <v-text-field
            v-model="city"
            :counter="64"
            :rules="cityRules"
            label="City"
            required
        ></v-text-field>
    </v-col>

    <v-col cols="12" sm="4">
        <v-text-field
            v-model="street"
            :counter="64"
            :rules="streetRules"
            label="Street"
            required
        ></v-text-field>
    </v-col>
    </v-row>

    <v-row>
    <v-col cols="12" sm="6">
        <v-text-field
            v-model="houseNumber"
            :rules="houseNumberRules"
            label="House Number"
            required
        ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
        <v-text-field
            v-model="apartmentNumber"
            :rules="apartmentNumberRules"
            label="Apartment Number"
        ></v-text-field>
    </v-col>
    </v-row>

    <v-textarea
        v-model="message"
        :counter="255"
        :rules="messageRules"
        label="Message (optional)"
    ></v-textarea>

    <v-checkbox
        v-if="!reservationId"
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="I agree with term & conditions"
        required
    ></v-checkbox>

    <v-btn
        class="mr-4 button"
        color="brown"
        :disabled="disabled"
        @click="submitForm"
    >
        {{reservationId ? 'Update' : 'Book'}}
    </v-btn>

    <v-alert v-model="success" type="success" class="message">
      Congratulation! <br/>
      Your reservation was successful
    </v-alert>

    <v-alert v-model="error" type="error" class="message">
      Error! <br/>
      Sorry something went wrong. Please try again later. 
    </v-alert>
</v-form>
</template>

<script>
import { ref, computed } from 'vue'
import axios from '../axios'

export default {
    name: 'ReservationForm',
    props: {
        disabledDates: Array,
    },
    data: () => ({
      reservationId: 0,
      clientId: 0,
      disabled: false,
      success: false,
      error: false,
      valid: true,
      isDateValid: null,
      firstName: '',
      firstNameRules: [
        v => !!v || 'First Name is required',
        v => (v && v.length <= 50) || 'First Name must be less than 50 characters',
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Last Name is required',
        v => (v && v.length <= 120) || 'Last Name must be less than 120 characters',
      ],
      documentNumber: '',
      documentNumberRules: [
        v => !!v || 'Document Number is required',
        v => (v && v.length == 11) || 'Document Number must be 11 digits',
        v => /^[0-9]+$/.test(v) || 'Document Number must be only digits',
      ],
      phoneNumber: '',
      phoneNumberRules: [
        v => !!v || 'Phone Number is required',
        v => (v && v.length == 9) || 'Phone Number must be 9 digits',
        v => /^[0-9]+$/.test(v) || 'Phone Number must be only digits',
      ],
      postalCode: '',
      postalCodeRules: [
        v => !!v || 'Postal Code is required',
        v => (v && v.length == 6) || 'Postal Code must be 5 digits and \'-\' character',
        v => /^[0-9]{2}[-][0-9]{3}$/.test(v) || 'Postal code must have patern: XX-XXX',
      ],
      city: '',
      cityRules: [
        v => !!v || 'City is required',
        v => (v && v.length <= 64) || 'City must be less than 64 characters',
      ],
      street: '',
      streetRules: [
        v => !!v || 'Street is required',
        v => (v && v.length <= 64) || 'Street must be less than 64 characters',
      ],
      houseNumber: '',
      houseNumberRules: [
        v => !!v || 'House Number is required',
        v => /^[0-9]+$/.test(v) || 'House Number must be number',
      ],
      apartmentNumber: 0,
      apartmentNumberRules: [
        v => /^[0-9]+$/.test(v) || 'Apartment Number must be number',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        v => (v && v.length <= 64) || 'Email must be less than 64 characters',
      ],
      message: '',
      messageRules: [
        v => (v.length <= 255) || 'Message must be less than 255 characters',
      ],
      checkbox: false,
    }),
    setup(props) {
        const date = ref()
      
        //  Disabled date for specific room
        const disabledDates = computed( () => {
            return props.disabledDates
        })
        
        return {
            disabledDates,
            date,
        }
    },
    methods: {
      setData(reservation) {
        console.log(reservation)
        this.reservationId = reservation.reservation_id;
        this.clientId = reservation.client_id;
        this.checkbox = true;
        this.date = [new Date(reservation.start_date), new Date(reservation.end_date)];
        this.firstName = reservation.first_name;
        this.lastName = reservation.last_name;
        this.email = reservation.email;
        this.documentNumber = reservation.document_number;
        this.phoneNumber = reservation.phone_number;
        this.postalCode = reservation.postal_code;
        this.city = reservation.city;
        this.street = reservation.street;
        this.houseNumber = reservation.house_number;
        this.apartmentNumber = reservation.apartment_number;
        this.message = reservation.message;
        // this.
      },

      validateDate() {
        //  Check calender
        if(this.date === undefined || this.date === null) {
          this.isDateValid = false
        } else {
          this.isDateValid = null

          //  Check if start date is valid
          if(!(new Date() < this.date[0])) {
              this.isDateValid = false
          }
        }
      },
      async validate () {
        //  Check form
        const result = await this.$refs.form.validate()

        //  Check calender
        if(this.date === undefined || this.date === null) {
          this.isDateValid = false
          return false
        }

        return result.valid
      },
      async submitForm() {
        //  Reset calender style
        this.isDateValid = null

        //  If everything is good send data to backend
        if(await this.validate()) {
            try {
                //  Check if apartment number is given
                let apartmentNumberFixed = null
                this.apartmentNumber === 0 ? apartmentNumberFixed = null : apartmentNumberFixed = this.apartmentNumber
                const startDate = this.date?.[0]?.toLocaleDateString("pl-PL")
                const endDate = this.date?.[1]?.toLocaleDateString("pl-PL")

                //  Try to add client
                if (this.clientId > 0) {
                  await axios.put('/clients/' + this.clientId, {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    document_number: this.documentNumber,
                    phone_number: this.phoneNumber,
                    email: this.email,
                    postal_code: this.postalCode,
                    city: this.city,
                    street: this.street,
                    house_number: this.houseNumber,
                    apartment_number: apartmentNumberFixed
                  });

                  await axios.put('/reservations/' + this.reservationId, {
                    client_id: this.clientId,
                    start_date: startDate,
                    end_date: endDate,
                    message: this.message
                  })

                  this.disabled = true
                  this.error = false
                  this.success = true

                  setTimeout(() => this.$emit("updated"), 2000);
                } else {
                  const client = await axios.post('/clients', {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    document_number: this.documentNumber,
                    phone_number: this.phoneNumber,
                    email: this.email,
                    postal_code: this.postalCode,
                    city: this.city,
                    street: this.street,
                    house_number: this.houseNumber,
                    apartment_number: apartmentNumberFixed
                  })

                  //  Try to add reservation
                  const roomId = this.$route.params.id
                  const clientId = client?.data?.rows?.[0]?.client_id

                  const reservation = await axios.post('/reservations', {
                    room_id: roomId,
                    client_id: clientId,
                    start_date: startDate,
                    end_date: endDate,
                    message: this.message
                  })


                  //  Booleans for messages and disabling submit button
                  this.disabled = true
                  this.error = false
                  this.success = true

                  //  Redirect to sum up of reservation after delay
                  setTimeout( () => this.$router.push({ path: `/reservation/${reservation.data.rows[0].reservation_id}/summary`}), 3000);
                }
            } catch (err) {
              this.success = false
              this.error = true
              console.log(err.message)
            }
        }
      }
    },
}
</script>

<style scoped>
.button {
    opacity: 0.9;
    margin-bottom: 2em;
}

.message {
  width: 50%;
  margin: auto;
}
</style>

<style lang="scss">
.dp-custom-input {
  height: 3.5em;
}
</style>
