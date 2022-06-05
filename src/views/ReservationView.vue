<template>
<v-card
  id="card"
  elevation="2"
>
    <v-card-title id="title">
        Reservation: Room-Name
    </v-card-title>

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
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="I agree with term & conditions"
          required
      ></v-checkbox>

      <v-btn
          class="mr-4 button"
          color="brown"
          @click="submitForm"
      >
          Validate
      </v-btn>
    </v-form>
</v-card>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'ReservationView',
    data: () => ({
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
        v => (v && v.length == 11) || 'Document Number must be 9 digits',
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
    setup() {
        const date = ref()

        return {
            date,
        }
    },
    methods: {
      validateDate() {
        //  Check calender
        if(this.date === undefined || this.date === null) {
          this.isDateValid = false
        } else {
          this.isDateValid = null
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
          console.log(
            this.date?.[0].toLocaleDateString("pl-PL")
            + ' ' +
            this.date?.[1].toLocaleDateString("pl-PL")
            + ' ' +
            this.email
            + ' ' +
            this.firstName
            + ' ' +
            this.lastName
            + ' ' +
            this.documentNumber
            + ' ' +
            this.phoneNumber
            + ' ' +
            this.postalCode
            + ' ' +
            this.city
            + ' ' +
            this.street
            + ' ' +
            this.houseNumber
            + ' ' +
            this.apartmentNumber
            + ' ' +
            this.message
            + ' ' +
            this.checkbox
          )
        }
      }
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

.button {
    opacity: 0.9;
}
</style>

<style lang="scss">
.dp-custom-input {
  height: 3.5em;
}
</style>