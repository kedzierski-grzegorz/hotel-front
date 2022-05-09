<template>
<div>
    <v-btn
        class="facilities"
        elevation="2"
        icon
        color="brown"
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
    >
        <v-icon>
            mdi-dog-side
        </v-icon>
    </v-btn>
</div>
</template>

<script>
export default {
    name: 'FacilitiesIcons'
}
</script>

<style scoped>
.facilities {
    margin-right: 2em;
}
</style>
