<template>
<div>
    <v-btn
        title="WiFi Available"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isWifi"
    >
        <v-icon dark>
            mdi-wifi
        </v-icon>
    </v-btn>

    <v-btn
        title="Parking Space"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isParking"
    >
        <v-icon dark>
            mdi-parking
        </v-icon>
    </v-btn>
    
    <v-btn
        title="Pet Friendly"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.animalAllow"
    >
        <v-icon>
            mdi-dog-side
        </v-icon>
    </v-btn>

    <v-btn
        title="Breakfast Included"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isBreakfast"
    >
        <v-icon>
            mdi-food-croissant
        </v-icon>
    </v-btn>

    <v-btn
        title="Room Service"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isRoomService"
    >
        <v-icon>
            mdi-broom
        </v-icon>
    </v-btn>

    <v-btn
        title="24 Hour Lounge"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isLounge"
    >
        <v-icon>
            mdi-store-24-hour
        </v-icon>
    </v-btn>

    <v-btn
        title="Hotel Swimming Pool"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isPool"
    >
        <v-icon>
            mdi-pool
        </v-icon>
    </v-btn>

    <v-btn
        title="Hotel SPA"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isSpa"
    >
        <v-icon>
            mdi-lotion-outline
        </v-icon>
    </v-btn>

    <v-btn
        title="Hotel Park"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isGarden"
    >
        <v-icon>
            mdi-tree
        </v-icon>
    </v-btn>

    <v-btn
        title="Hotel Gym"
        class="facilities"
        elevation="2"
        icon
        color="brown"
        :disabled="!facilities.isGym"
    >
        <v-icon>
            mdi-weight-lifter
        </v-icon>
    </v-btn>
</div>
</template>

<script>
export default {
    name: 'FacilitiesIcons',
    props: ['facilities']
}
</script>

<style scoped>
.facilities {
    margin-right: 2em;
}
</style>
