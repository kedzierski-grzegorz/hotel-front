<template>
<div>
    <v-btn
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
