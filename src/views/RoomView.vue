<template>
<v-container class="d-flex flex-column justify-center col-12">
    <!-- Here wil be room photo -->
    <v-img
        cover
        max-height="450px"
        max-width="100%"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Living_Room.jpg/2560px-Living_Room.jpg"
    ></v-img>

    <v-card id="room-info">
        <v-card-title id="title">
            Title Room_id: {{ $route.params.id }}

            <v-spacer></v-spacer>

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
                    4.5 (100)
                </div>    
            </v-card-subtitle>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-subtitle id="price-info" class="font-weight-black">
            <p style="color: black">
                $ 56
            </p>/night
        </v-card-subtitle>
 
        <v-divider></v-divider>
        
        <v-card-text>
            <div class="my-4 text-subtitle-1">
                Description
            </div>

            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer porttitor sem eu ullamcorper elementum.
                Nulla facilisi. Donec aliquam mauris felis.
                In a consequat lorem. Praesent ultricies turpis ut sagittis malesuada.
                Cras consequat mi quis nulla hendrerit aliquam.
                Morbi dui elit, rutrum nec turpis a, porta finibus nisl.
                Pellentesque rutrum, nisl sed tempor finibus, neque justo luctus nibh, sit amet semper arcu dui id orci.
                Nunc ipsum velit, blandit non nulla vitae, sagittis facilisis quam.
                Vestibulum finibus fringilla pharetra.
                Nunc velit leo, pharetra non porttitor a, pellentesque volutpat est.
                Fusce ac pharetra ligula, eget viverra mi. Aliquam mattis eu justo blandit dapibus.
                Ut eu risus at est mattis imperdiet.
            </div>
        </v-card-text>

        <v-card-text>
            <div class="my-4 text-subtitle-1">
                Facilities
            </div>

            <v-card-subtitle>
                <FacilitiesIcons />    
            </v-card-subtitle>
        </v-card-text>
    </v-card>
    
</v-container>
</template>

<script>
import FacilitiesIcons from '../components/FacilitiesIcons.vue'

export default {
    name: 'RoomView',
    components: {
        FacilitiesIcons
    },
    data() {
        return {
            rating: 4.5
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
</style>
