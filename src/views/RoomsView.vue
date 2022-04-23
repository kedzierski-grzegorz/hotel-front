<template>
    <v-container fluid>
        <v-row v-bind:key="n" v-for="n in rooms.length"> <!-- In row we have max 3 column with 1 room card in each-->
            <v-col 
                v-bind:key="rooms[n-1][m-1]"
                v-for="m in rooms[n-1].length"
                cols="12"
                sm="4"
            >
                <RoomCard 
                    v-bind:rooms="rooms[n-1][m-1]"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import RoomCard from '../components/RoomCard.vue';

export default {
    name: 'RoomView',
    components: {
        RoomCard,
    },
    data: () => ({
        rooms: [
            [{
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_Oc-DoKyRc7pc3-32xQzefUjPycL3-w07g&usqp=CAU',
                title: 'test title 1',
                description: 'test description 1',
                rating: 3,
                countOfRatings: 10,
                price: 120,
                extendedDescription: 'test extended description 1'
            },
            {
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_Oc-DoKyRc7pc3-32xQzefUjPycL3-w07g&usqp=CAU',
                title: 'test title 2',
                description: 'test description 2',
                rating: 4,
                countOfRatings: 100,
                price: 40,
                extendedDescription: 'test extended description 2'
            },
            {
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_Oc-DoKyRc7pc3-32xQzefUjPycL3-w07g&usqp=CAU',
                title: 'test title 3',
                description: 'test description 3',
                rating: 2,
                countOfRatings: 1,
                price: 200,
                extendedDescription: 'test extended description 3'
            }],
            [{
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_Oc-DoKyRc7pc3-32xQzefUjPycL3-w07g&usqp=CAU',
                title: 'test title 4',
                description: 'test description 4',
                rating: 5,
                countOfRatings: 30,
                price: 80,
                extendedDescription: 'test extended description 4'
            },                        
            {
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa_Oc-DoKyRc7pc3-32xQzefUjPycL3-w07g&usqp=CAU',
                title: 'test title 5',
                description: 'test description 5',
                rating: 1,
                countOfRatings: 20,
                price: 50,
                extendedDescription: 'test extended description 5'
            }],
            
        ], // Here will be rooms info from backend but we need change db structure
    }),
};
</script>