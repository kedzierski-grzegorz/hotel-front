<template>
    <v-container fluid>
        <v-row>
            <v-col
                cols="12"
                sm="4"
                v-for="index in rooms.length"
                v-bind:key="index"
            >
                <RoomCard 
                    v-bind:room="rooms[index-1]"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import RoomCard from '../components/RoomCard.vue'
import axios from '../axios'

export default {
    name: 'RoomView',
    components: {
        RoomCard,
    },
    data: () => ({
        rooms: [],
    }),
    created: async function() {
        try {
            const rooms = await axios.get('/rooms')

            // Add rooms to rooms table
            await rooms?.data?.rows?.forEach(room => {
                this.rooms.push(room)
            })
            
            // Generate ratings
            this.rooms.forEach(room => {
                this.generateRatings(room)
            })
            // this.generateRatings(this.rooms)
        } catch (err) {
            console.log(err.message)
        }
    },
    methods: {
        async generateRatings(room) {
            const ratings = await axios.get(`/ratings/${room.room_id}`)
            room.countOfRatings = ratings?.data?.rows?.length + 1

            // Count rating
            let avgRatings = 0
            ratings?.data?.rows?.forEach(row => {
                avgRatings += row.rating
            })
            room.rating = (avgRatings / room.countOfRatings).toFixed(1)
        }, 
    }
};
</script>
