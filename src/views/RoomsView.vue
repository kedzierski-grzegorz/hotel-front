<template>
    <v-container fluid>
        <v-card id="filtr">
            <v-row>
                <v-col style="text-align: center;">                    
                    <v-btn
                        color="brown"
                        @click="showStandards = !showStandards"
                        style="opacity: 0.9;"
                    >
                        STANDARD
                    </v-btn>

                    <v-container
                        class="px-0"
                        fluid
                        v-show="showStandards"
                    >
                        <v-checkbox
                            v-model="economic"
                            label="ECONOMIC"
                            color="brown"
                            hide-details
                        ></v-checkbox>

                        <v-checkbox
                            v-model="standard"
                            label="STANDARD"
                            color="brown"
                            hide-details
                        ></v-checkbox>

                        <v-checkbox
                            v-model="premium"
                            label="PREMIUM"
                            color="brown"
                            hide-details
                        ></v-checkbox>
                    </v-container>
                </v-col>

                <!-- ROOM STANDARD -->

                <v-col style="text-align: center;">
                    <v-btn
                        color="brown"
                        @click="showPrice = !showPrice"
                        style="opacity: 0.9;"
                    >                    
                        PRICE
                    </v-btn>

                    <v-container
                        class="px-0"
                        fluid
                        v-show="showPrice"
                    >
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="minPrice"
                                    label="Min Price"
                                ></v-text-field>    
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="maxPrice"
                                    label="Max Price"
                                ></v-text-field>    
                            </v-col>                          
                        </v-row>
                    </v-container>
                </v-col>

                <!-- PRICE -->

                <v-col style="text-align: center;">
                    <v-btn
                        color="brown"
                        @click="showSleeps = !showSleeps"
                        style="opacity: 0.9;"
                    >
                        SLEEPS
                    </v-btn>

                    <v-container
                        class="px-0"
                        fluid
                        v-show="showSleeps"
                    >
                        <v-select
                            v-model="select"
                            :items="items"
                            label="Sleeps"
                        ></v-select>
                    </v-container>
                </v-col>

                <!-- SLEEPS -->

                <v-col style="text-align: center;">
                     <v-btn
                        color="brown"
                        @click="showDate = !showDate"
                        style="opacity: 0.9;"
                    >   
                        DATE
                     </v-btn>

                     <v-container
                        class="px-0"
                        fluid
                        v-show="showDate"
                    >
                        <Datepicker
                            inputClassName="dp-custom-input"
                            v-model="date"
                            range
                            autoApply
                            format="dd/MM/yyyy"
                            placeholder="Select Date"
                            required
                            :enableTimePicker="false"
                            />
                     </v-container>
                </v-col>

                <!-- DATE -->
            </v-row>
        </v-card>

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
        showStandards: false,
        economic: false,
        standard: true,
        premium: false,
        showPrice: false,
        minPrice: 1,
        maxPrice: 1000,
        showSleeps: false,
        select: 2,
        items: [],
        showDate: false,
        date: '',
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

            //  Generate number of sleeps
            for(let i = 1; i <= 10; i++) {
                this.items[i] = i
            }

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

<style scoped>
#filtr {
    margin-bottom: 1em;
    padding: 1em;
}
</style>