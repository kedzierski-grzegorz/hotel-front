<template>
  <v-container fluid>
    <v-row class="mb-2">
      <v-col sm="11">
        <h3>Reservations</h3>
      </v-col>
    </v-row>
    <v-table
        fixed-header
        height="300px"
        class="elevation-1">
      <thead>
      <tr>
        <th class="text-left" style="z-index: 10">
          Action
        </th>
        <th class="text-left">
          Room
        </th>
        <th class="text-left">
          Start date
        </th>
        <th class="text-left">
          End date
        </th>
        <th class="text-left">
          Sleeps
        </th>
        <th class="text-left">
          Customer
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          Phone
        </th>
        <th class="text-left">
          Message
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="reservation in reservations"
          :key="reservation.reservation_id">
        <td width="100px">
          <v-btn variant="text"
                 size="x-small"
                 @click="$refs.reservationEdit.open(reservation.reservation_id)"
                 icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn variant="text"
                 size="x-small"
                 color="error"
                 @click="deleteRoom(reservation.reservation_id)"
                 icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
        <td>{{ reservation.title }}</td>
        <td>{{ new Date(reservation.start_date).toISOString().split('T')[0] }}</td>
        <td>{{ new Date(reservation.end_date).toISOString().split('T')[0] }}</td>
        <td>{{ reservation.sleeps }}</td>
        <td>{{ reservation.first_name + ' ' + reservation.last_name }}</td>
        <td><a :href="'mailto:' + reservation.email">{{reservation.email}}</a></td>
        <td><a :href="'callto:' + reservation.phone_number">{{reservation.phone_number}}</a></td>
        <td>{{ reservation.message }}</td>
      </tr>
      </tbody>
    </v-table>

    <AdminReservationEdit ref="reservationEdit" @updated="refreshData()"/>
  </v-container>
</template>

<script>
import axios from "../../axios";
import LoadingService from "../../services/loading.service";
import ConfirmDialogService from "../../services/confirm-dialog.service";
import SnackbarService from "../../services/snackbar.service";
import AdminService from "../../services/admin.service";
import AdminReservationEdit from "../../components/AdminReservationEdit.vue";

export default {
  name: "AdminReservationsView",
  components: {
    AdminReservationEdit
  },
  data: () => ({
    reservations: [],
  }),
  created: async function() {
    this.refreshData();
  },

  methods: {
    async refreshData() {
      LoadingService.show();
      try {
        this.reservations = [];

        const reservations = await axios.get('/reservations-details')
        // Add reservations to reservations table
        await reservations?.data?.rows?.forEach(reservation => {
          this.reservations.push(reservation)
        })

      } catch (err) {
        console.log(err.message)
      }
      LoadingService.hide();
    },

    async deleteRoom(reservationId) {
      if (! await ConfirmDialogService.show(
          'Deleting reservation',
          'Are you sure you want to delete the reservation?'
      )) {
        return;
      }

      console.log('asd')

      LoadingService.show();

      try {
        await AdminService.deleteReservation(reservationId);

        SnackbarService.show({
          text: "The reservation was removed",
          color: "success"
        });

        await this.refreshData();
      } catch(e) {
        console.error(e);
        SnackbarService.show({
          text: "The reservation was not removed",
          color: "red"
        });
      }

      LoadingService.hide();
    }
  }
}
</script>

<style scoped>

</style>
