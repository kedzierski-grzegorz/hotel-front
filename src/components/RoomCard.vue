<template>
<v-card>
    <router-link :to="`/room/${this.room.room_id}`" style="text-decoration: none; color: inherit;">
    <!-- Here wil be room photo -->
        <v-img
            cover
            :src=this.room.img
            height="250px"
        ></v-img>

        <v-card-title>
            {{ this.room.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ this.room.description }}
        </v-card-subtitle>

        <v-card-subtitle
            id="rating"
        >
            <v-rating
                v-model=this.room.rating
                color="brown"
                half-increments
                length="5"
                readonly
                size="20"
            ></v-rating>
            <div class="grey--text ms-4">
                {{ this.room.rating }} ({{ this.room.countOfRatings }})
            </div>
        </v-card-subtitle>

        <v-card-subtitle id="price" class="font-weight-black">
            <p class="font-weight-black">
                $ {{ this.room.price }}
            </p>
            /night
        </v-card-subtitle>
    </router-link>

    <v-card-actions>
        <v-btn text>
            More
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            icon
            @click="show = !show"
        >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
    </v-card-actions>

    <v-expand-transition>
        <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
                {{ this.room.extendedDescription }}
            </v-card-text>
        </div>
    </v-expand-transition>
</v-card>
</template>

<script>
export default {
    name: 'RoomCard',
    props: ['room'],
    data: () => ({
        show: false,
    }),
}
</script>

<style scoped>
#rating {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

#price {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}
</style>
