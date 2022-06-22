<template>
  <v-row>
    <v-dialog v-model="dialog" persistent scrollable>
      <v-card min-width="1200px" max-width="1200px">
        <v-card-title class="pa-0 dialog-header">
          <v-toolbar fixed dark flat class="bg-brown w-100">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{
              reservationId ? "Edit reservation" : "Add reservation"
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card-title>

        <div class="pa-4">
          <ReservationForm ref="form" @updated="dialog = false; $emit('updated')"/>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import LoadingService from "../services/loading.service";
import AdminService from "../services/admin.service";
import SnackbarService from "../services/snackbar.service";
import ReservationForm from "./ReservationForm.vue";

export default {
  name: "AdminReservationEdit",
  components: {ReservationForm},
  data: function () {
    return {
      dialog: false,
      reservationId: 0,
      reservation: {}
    };
  },

  methods: {
    async open(reservationId) {
      // this.clear();
      this.reservationId = reservationId;
      this.reservation = {};
      this.dialog = true;

      if (this.reservationId > 0) {
        await this.loadData();
      } else {
        this.reservation = {};
      }
    },

    async loadData() {
      LoadingService.show();

      try {
        this.reservation = await AdminService.getReservationById(this.reservationId);
        this.$refs.form.setData(this.reservation);
      } catch (e) {
        console.error(e);
      }

      LoadingService.hide();
    },

    async save() {
      this.v$.$touch();
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }

      this.room.title = this.v$.title.$model;
      this.room.floor = this.v$.floor.$model;
      this.room.price = this.v$.price.$model;
      this.room.sleeps = this.v$.sleeps.$model;
      this.room.description = this.v$.description.$model;
      this.room.img_link = this.v$.imgLink.$model;

      LoadingService.show();
      try {
        if (this.roomId > 0) {
          await AdminService.updateRoom(this.room);
        } else {
          const id = await AdminService.addRoom(this.room);
          this.roomId = id;
        }

        await this.saveFacilities();

        SnackbarService.show({
          text: "The room saved",
          color: "success",
        });

        this.dialog = false;
        this.$emit("saved");
        this.clear();
      } catch (e) {
        console.error(e);
        SnackbarService.show({
          text: "The room was not saved",
          color: "red",
        });
      }

      LoadingService.hide();
    },

    async saveFacilities() {
      for (let facility of Object.keys(this.roomFacilities)) {
        if (facility === "room_id") {
          continue;
        }

        await AdminService.setRoomFacility(
          this.roomId,
          facility,
          this.roomFacilities[facility]
        );
      }
    },
  },
};
</script>

<style>
.img-room {
  max-width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
}

.img-room img {
  opacity: 1 !important;
}

.w-100 {
  width: 100%;
}

.dialog-header {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
