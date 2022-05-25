<template>
  <v-row>
    <v-dialog
        v-model="dialog"
        persistent>
      <v-card min-width="600px" max-width="800px">
        <v-toolbar
            dark
            class="bg-brown">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{roomId ? 'Edit room' : 'Add room'}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                dark
                text
                @click="save()"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <form class="py-4 px-4" @submit.prevent="save()" @keyup.enter="save()">
          <v-text-field
              label="Title"
              v-model="v$.title.$model"
              :error-messages="v$.title.$error ? 'Title is required' : ''"></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                  type="number"
                  label="Price"
                  v-model="v$.price.$model"
                  :rules="[numberRule]"
                  :error-messages="v$.price.$error ? 'Price is required' : ''"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  type="number"
                  label="Sleeps"
                  :rules="[numberRule]"
                  v-model="v$.sleeps.$model"
                  :error-messages="v$.sleeps.$error ? 'Sleeps is required' : ''"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                  type="number"
                  label="Floor"
                  :rules="[numberRule]"
                  v-model="v$.floor.$model"
                  :error-messages="v$.floor.$error ? 'Floor is required' : ''"></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
              label="Description"
              v-model="v$.description.$model"></v-text-field>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import LoadingService from "../services/loading.service";
import AdminService from "../services/admin.service";
import SnackbarService from "../services/snackbar.service";

export default {
  name: "AdminRoomEdit",
  data: function () {
    return {
      dialog: false,
      roomId: 0,
      room: undefined,

      v$: useVuelidate(),
      title: '',
      floor: 1,
      price: 1,
      description: '',
      sleeps: 1,

      numberRule: v  => {
        if (!isNaN(parseFloat(v)) && v > 0) {
          return true;
        }
        return 'Has to be greater than 0';
      },
    }
  },

  validations() {
    return {
      title: {required},
      floor: {required},
      price: {required},
      sleeps: {required},
      description: {}
    }
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
        this.v$.floor.$model = this.room.floor;
        this.v$.price.$model = this.room.price;
        this.v$.sleeps.$model = this.room.sleeps;
        this.v$.description.$model = this.room.description;
      } catch (e) {
        console.error(e);
      }

      LoadingService.hide();
    },

    clear() {
      this.roomId = 0;
      this.room = undefined;
      this.v$.title.$model = '';
      this.v$.floor.$model = 1;
      this.v$.price.$model = 1;
      this.v$.sleeps.$model = 1;
      this.v$.description.$model = 1;
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

      try {
        if (this.roomId > 0) {
          await AdminService.updateRoom(this.room);
        } else {
          await AdminService.addRoom(this.room);
        }

        SnackbarService.show({
          text: "The room saved",
          color: "success"
        });

        this.dialog = false;
        this.$emit('saved');
        this.clear();
      } catch (e) {
        console.error(e);
        SnackbarService.show({
          text: "The room was not saved",
          color: "red"
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
