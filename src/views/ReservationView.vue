<template>
    <Datepicker v-model="date" range />
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'ReservationView',
    setup() {
        const date = ref()
        return {
            date,
        }
    }
}
</script>

<style scoped>

</style>
