<template>
    <v-container fluid>
        <v-card id="filtr">
            <v-row>
                <v-col style="text-align: center;">                    
                    <v-btn
                        color="brown"
                        @click="show = !show"
                        style="opacity: 0.9;"
                    >
                        STANDARD
                    </v-btn>

                    <v-container
                        class="px-0"
                        fluid
                        v-show="show"
                    >
                        <v-checkbox
                            v-model="economic"
                            label="ECONOMIC"
                            color="brown"
                            hide-details
                            @click="checkBox1()"
                        ></v-checkbox>

                        <v-checkbox
                            v-model="standard"
                            label="STANDARD"
                            color="brown"
                            hide-details
                            @click="checkBox2()"
                        ></v-checkbox>

                        <v-checkbox
                            v-model="premium"
                            label="PREMIUM"
                            color="brown"
                            hide-details
                            @click="checkBox3()"
                        ></v-checkbox>
                    </v-container>
                </v-col>

                <!-- ROOM STANDARD -->

                <v-col style="text-align: center;">
                    <v-btn
                        color="brown"
                        @click="show = !show"
                        style="opacity: 0.9;"
                    >                    
                        PRICE
                    </v-btn>

                    <v-container
                        class="px-0"
                        fluid
                        v-show="show"
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
                        @click="show = !show"
                        style="opacity: 0.9;"
                    >
                        SLEEPS
                    </v-btn>

                    <v-container
                        class="px-0"
                        fluid
                        v-show="show"
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
                        @click="show = !show"
                        style="opacity: 0.9;"
                    >   
                        DATE
                     </v-btn>

                     <v-container
                        class="px-0"
                        fluid
                        v-show="show"
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

                        <v-btn
                            color="brown"
                            style="opacity: 0.9;margin-top: 5em;"
                            @click="filterRooms()"
                        >                    
                            SHOW
                        </v-btn>

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
        show: false,
        economic: false,
        standard: true,
        premium: false,
        minPrice: 1,
        maxPrice: 1000,
        select: 2,
        items: [],
        date: [],
        disabledDates: [],
    }),
    created: async function() {
        try {
            await this.getRooms()
        } catch (err) {
            console.log(err.message)
        }
    },
    methods: {
        async getRooms() {
            try {
                const rooms = await axios.get('/rooms')

                //  Clear rooms array
                this.rooms = []

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
        async generateRatings(room) {
            const ratings = await axios.get(`/ratings/${room.room_id}`)
            room.countOfRatings = ratings?.data?.rows?.length + 1

            // Count rating
            let avgRatings = 0
            ratings?.data?.rows?.forEach(row => {
                avgRatings += row.rating
            })
            room.rating = Number.parseFloat((avgRatings / room.countOfRatings).toFixed(1))
        },
        async filterRooms() {
            try {
                //  Get all rooms from db
                await this.getRooms()

                //  Filter rooms
                const newRooms = (this.rooms.filter( async (room) => {
                    return ( 
                        this.economic ? room.room_standard == "ECONOMIC" : true
                        && this.standard ? room.room_standard == "STANDARD": true
                        && this.premium ? room.room_standard == "PREMIUM" : true
                        && !isNaN(this.minPrice) ? room.price > this.minPrice : true
                        && !isNaN(this.maxPrice) ? room.price > this.maxPrice : true
                        && room.sleeps >= this.select
                    )
                }))

                this.rooms = newRooms
            } catch (err) {
                console.log(err.message)
            }
        },
        checkBox1() {
            this.standard = false
            this.premium = false
        },
        checkBox2() {
            this.economic = false
            this.premium = false
        },
        checkBox3() {
            this.economic = false
            this.standard = false
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