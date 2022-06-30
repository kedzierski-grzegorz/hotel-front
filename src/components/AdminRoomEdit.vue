<template>
  <v-row>
    <v-dialog v-model="dialog" persistent scrollable>
      <v-card min-width="800px" max-width="1000px">
        <v-card-title class="pa-0 dialog-header">
          <v-toolbar fixed dark flat class="bg-brown w-100">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{
              roomId ? "Edit room" : "Add room"
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="save()"> Save </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-card-title>

        <form class="py-4 px-4" @submit.prevent="save()" @keyup.enter="save()">
          <v-row>
            <v-col>
              <v-text-field
                  label="Title"
                  v-model="v$.title.$model"
                  :error-messages="v$.title.$error ? 'Title is required' : ''"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                  :items="['ECONOMIC', 'STANDARD', 'PREMIUM']"
                  filled
                  v-model="v$.room_standard.$model"
                  :error-messages="v$.room_standard.$error ? 'Room\'s standard is required' : ''"
                  label="Room standard"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                type="number"
                label="Price"
                v-model="v$.price.$model"
                :rules="[numberRule]"
                :error-messages="v$.price.$error ? 'Price is required' : ''"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="Sleeps"
                :rules="[numberRule]"
                v-model="v$.sleeps.$model"
                :error-messages="v$.sleeps.$error ? 'Sleeps is required' : ''"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="Floor"
                :rules="[numberRule]"
                v-model="v$.floor.$model"
                :error-messages="v$.floor.$error ? 'Floor is required' : ''"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            label="Description"
            v-model="v$.description.$model"
          ></v-text-field>

          <v-row>
            <v-col md="9" cols><b>Room's image</b></v-col>
            <v-col md="3">
              <v-btn text @click="$refs.fileInput.click()">Change image</v-btn>
              <p
                style="
                  color: rgb(var(--v-theme-error));
                  font-size: 12px;
                  margin-top: 6px;
                "
                v-if="v$.imgLink.$error"
              >
                Room's image is required
              </p>
              <input
                type="file"
                v-show="false"
                ref="fileInput"
                @change="onFileChanged"
                accept="image/png, image/jpeg"
              />
            </v-col>
          </v-row>

          <v-img :src="v$.imgLink.$model" class="img-room"></v-img>

          <v-row>
            <v-col md="9" cols><b>Room's facilities</b></v-col>
          </v-row>
          <v-row>
            <v-col
              md="3"
              v-for="facility in Object.keys(allRoomFacilities).sort((a, b) =>
                a <= b ? -1 : 1
              )"
              v-bind:key="facility"
            >
              <v-checkbox
                v-model="roomFacilities[facility.toLowerCase()]"
                hide-details
                :label="allRoomFacilities[facility]"
              ></v-checkbox>
            </v-col>
          </v-row>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import LoadingService from "../services/loading.service";
import AdminService from "../services/admin.service";
import SnackbarService from "../services/snackbar.service";
import RoomFacilities from "../models/room-facilities";

export default {
  name: "AdminRoomEdit",
  data: function () {
    return {
      dialog: false,
      roomId: 0,
      room: undefined,
      allRoomFacilities: RoomFacilities,
      roomFacilities: {},

      v$: useVuelidate(),
      title: "",
      room_standard: "",
      floor: 1,
      price: 1,
      description: "",
      sleeps: 1,
      imgLink: "",

      numberRule: (v) => {
        if (!isNaN(parseFloat(v)) && v > 0) {
          return true;
        }
        return "Has to be greater than 0";
      },
    };
  },

  validations() {
    return {
      title: { required },
      room_standard: { required },
      floor: { required },
      price: { required },
      sleeps: { required },
      imgLink: { required },
      description: {},
    };
  },

  methods: {
    async open(roomId) {
      this.clear();
      this.roomId = roomId;
      this.dialog = true;

      if (this.roomId > 0) {
        await this.loadData();
      } else {
        this.room = {};
      }
    },

    async loadData() {
      LoadingService.show();

      try {
        this.room = await AdminService.getRoomById(this.roomId);
        this.v$.title.$model = this.room.title;
        this.v$.imgLink.$model = this.room.img_link;
        this.v$.floor.$model = this.room.floor;
        this.v$.price.$model = this.room.price;
        this.v$.room_standard.$model = this.room.room_standard;
        this.v$.sleeps.$model = this.room.sleeps;
        this.v$.description.$model = this.room.description;

        this.roomFacilities = await AdminService.getRoomFacilities(this.roomId);
      } catch (e) {
        console.error(e);
      }

      LoadingService.hide();
    },

    clear() {
      this.roomId = 0;
      this.room = undefined;
      this.v$.title.$model = "";
      this.v$.room_standard.$model = "";
      this.v$.floor.$model = 1;
      this.v$.price.$model = 1;
      this.v$.sleeps.$model = 1;
      this.v$.description.$model = 1;
      this.v$.imgLink.$model = "";
    },

    onFileChanged(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.v$.imgLink.$model = reader.result;
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    },

    async save() {
      this.v$.$touch();
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }

      this.room.title = this.v$.title.$model;
      this.room.room_standard = this.v$.room_standard.$model;
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
