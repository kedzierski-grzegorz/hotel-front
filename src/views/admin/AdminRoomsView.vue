<template>
  <v-container fluid>
    <v-row class="mb-2">
      <v-col sm="11">
        <h3>Rooms</h3>
        reserved: {{rooms.filter(r => r.reserved > 0).length}} / {{rooms.length}}
      </v-col>
      <v-col sm="1">
        <v-btn class="bg-brown" @click="$refs.roomEdit.open(0)">
          <v-icon>mdi-plus</v-icon>
          Add
        </v-btn>
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
          Is currently reserved
        </th>
        <th class="text-left">
          Title
        </th>
        <th class="text-left">
          Standard
        </th>
        <th class="text-left">
          Price
        </th>
        <th class="text-left">
          Floor
        </th>
        <th class="text-left">
          Sleeps
        </th>
        <th class="text-left">
          Description
        </th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="room in rooms"
            :key="room.room_id">
          <td width="100px">
            <v-btn variant="text"
                   size="x-small"
                   @click="$refs.roomEdit.open(room.room_id)"
                   icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn variant="text"
                   size="x-small"
                   color="error"
                   @click="deleteRoom(room.room_id)"
                   icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
          <td>
            <input type="checkbox" :checked="room.reserved > 0" disabled/>
          </td>
          <td>{{ room.title }}</td>
          <td>{{ room.room_standard }}</td>
          <td>{{ room.price }}</td>
          <td>{{ room.floor }}</td>
          <td>{{ room.sleeps }}</td>
          <td>{{ room.description }}</td>
        </tr>
      </tbody>
    </v-table>

    <AdminRoomEdit ref="roomEdit" @saved="refreshData()"/>
  </v-container>
</template>

<script>
import axios from "../../axios";
import RoomCard from "../../components/RoomCard.vue";
import LoadingService from "../../services/loading.service";
import ConfirmDialogService from "../../services/confirm-dialog.service";
import SnackbarService from "../../services/snackbar.service";
import AdminService from "../../services/admin.service";
import AdminRoomEdit from "../../components/AdminRoomEdit.vue";

export default {
  name: "AdminRoomsView",
  components: {
    AdminRoomEdit,
    RoomCard,
  },
  data: () => ({
    rooms: [],
  }),
  created: async function() {
    this.refreshData();
  },

  methods: {
    async refreshData() {
      LoadingService.show();
      try {
        this.rooms = [];

        const rooms = await axios.get('/rooms')
        // Add rooms to rooms table
        await rooms?.data?.rows?.forEach(room => {
          this.rooms.push(room)
        })

      } catch (err) {
        console.log(err.message)
      }
      LoadingService.hide();
    },

    async deleteRoom(roomId) {
      if (! await ConfirmDialogService.show(
          'Deleting room',
          'Are you sure you want to delete the room?'
      )) {
        return;
      }

      console.log('asd')

      LoadingService.show();

      try {
        await AdminService.deleteRoom(roomId);

        SnackbarService.show({
          text: "The room was removed",
          color: "success"
        });

        await this.refreshData();
      } catch(e) {
        console.error(e);
        SnackbarService.show({
          text: "The room was not removed",
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
