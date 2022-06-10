<template>
<v-container class="d-flex flex-column justify-center col-12">
    <!-- Here wil be room photo -->
    <v-img
        cover
        max-height="450px"
        max-width="100%"
        :src=room.img_link
        
    ></v-img>

    <v-card id="room-info">
        <v-card-title id="title">
            {{ room.title }}

            <v-card-subtitle>
                <v-rating
                    v-model=this.rating
                    color="brown"
                    half-increments
                    length="5"
                    readonly
                    size="20"
                ></v-rating>
                <div class="grey--text ms-4">
                    {{ rating }} ({{ countOfRatings - 1}})
                </div>    
            </v-card-subtitle>

            <v-spacer></v-spacer>
            <router-link :to="`/reservation/${this.$route.params.id}`" style="text-decoration: none; color: inherit;">
                <v-btn class="button" color="brown">Book now</v-btn>
            </router-link>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-subtitle id="price-info" class="font-weight-black">
            <p style="color: black">
                $ {{ room.price }}
            </p>/night
        </v-card-subtitle>
 
        <v-divider></v-divider>
        
        <v-card-text>
            <div class="my-4 text-subtitle-1">
                Description
            </div>

            <div>
                {{ room.extendedDescription }}
            </div>
        </v-card-text>

        <v-card-text>
            <div class="my-4 text-subtitle-1">
                Facilities
            </div>

            <FacilitiesIcons
                v-bind:facilities="facilities"
            />    
        </v-card-text>
    </v-card>
    
</v-container>
</template>

<script>
import FacilitiesIcons from '../components/FacilitiesIcons.vue'
import axios from '../axios'

export default {
    name: 'RoomView',
    components: {
        FacilitiesIcons
    },
    data() {
        return {
            room: {
                img_link: '',
                title: '',
                sleeps: '',
                floor: '',
                price: '',
                extendedDescription: '',
            },
            rating: 0,
            countOfRatings: 0,
            facilities: {
                isWifi: null,
                isParking: null,
                animalAllow: null
            }
        }
    },
    created: async function() {
        try {
            // Get data about room of room_id == this.$route.params.id 
            const roomData = await axios.get(`/rooms/${this.$route.params.id}`)
            this.generateRoom(roomData?.data?.rows?.[0])

            //  Get data about ratings of room_id == this.$route.params.id
            const ratingsData = await axios.get(`/ratings/${this.$route.params.id}`)
            this.generateRatings(ratingsData?.data?.rows)

            //  Get data about facilities of room_id == this.$route.params.id
            const facilitiesData = await axios.get(`/features/${this.$route.params.id}`)
            this.generateFacilites(facilitiesData?.data?.rows?.[0])
        } catch (err) {
            console.log(err.message)
        }
    },
    methods: {
        generateRoom(roomData) {
            // Check if data from backend exists and then asign it to variables
            this.room.img_link = roomData?.img_link
            this.room.title = roomData?.title
            this.room.sleeps = roomData?.sleeps
            this.room.floor = roomData?.floor
            this.room.price = roomData?.price
            this.room.extendedDescription = roomData?.extendedDescription
        },
        generateRatings(ratingsData) {
            this.countOfRatings = ratingsData.length + 1

            // Count rating
            ratingsData.forEach(row => {
                this.rating += row.rating
            });
            this.rating = (this.rating / this.countOfRatings).toFixed(1)
        },
        generateFacilites(facilitiesData) {
            // Check if data from backend exists and then asign it to variables
            this.facilities.isWifi = facilitiesData?.is_wifi
            this.facilities.isParking = facilitiesData?.is_parking
            this.facilities.animalAllow = facilitiesData?.animal_allow
        }
    }
}
</script>

<style scoped>
#title {
    padding-top: 1em;
    padding-bottom: 1em;
}

#room-info {
    margin-top: -0.5em;
    
}

#price-info {
    padding-top: 0.8em;
    padding-bottom: 0.8em;
}

.button {
    opacity: 0.9;
}
</style>
